import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { getTodayTimetable as fetchTodayClassesService } from '../../../api';
import { useSelector } from 'react-redux';

dayjs.extend(customParseFormat);

export const useTodayClasses = () => {
  const user = useSelector((state) => state.auth.user);
  const loggedInTeacherId = user?._id || user?.id;

  return useQuery({
    queryKey: ['todayClasses', loggedInTeacherId],
    queryFn: async () => {
      const allTodayClasses = await fetchTodayClassesService();

      const todaysClasses = allTodayClasses.filter(cls => {
        if (!loggedInTeacherId) return false;
        const tId = typeof cls.teacherId === 'object' ? cls.teacherId?._id : cls.teacherId;
        return String(tId) === String(loggedInTeacherId);
      });

      const toMinutes = (timeStr) => {
        if (!timeStr) return 0;
        let parsedTime = timeStr.replace(/am|pm/gi, '').trim();
        const [hStr, mStr] = parsedTime.split(':');
        let h = parseInt(hStr, 10);
        const m = parseInt(mStr, 10);

        if (timeStr.toLowerCase().includes('pm') && h !== 12) h += 12;
        if (timeStr.toLowerCase().includes('am') && h === 12) h = 0;
        
        return h * 60 + m;
      };

      const nowMinutes = dayjs().hour() * 60 + dayjs().minute();

      // Validate and enrich data
      const enrichedClasses = todaysClasses.reduce((acc, cls) => {
        const cs = cls.classSessionId;
        
        // Ensure ClassSession fields exist
        if (!cs || !cs.years || !cs.semester || !cs.section) {
          return acc; // Skip broken records
        }

        const t = cls.teacherId;
        const professorName = t
          ? `Prof. ${[t.firstName, t.lastName].filter(Boolean).join(' ') || t.name || 'Unknown'}`
          : 'Prof. Unknown';

        let status = 'Unknown';
        if (!cls.startTime || !cls.endTime) {
          console.warn(`[TodayClasses] Missing startTime/endTime for "${cls.subject}"`);
        } else {
          const startMin = toMinutes(cls.startTime);
          const endMin = toMinutes(cls.endTime);

          if (nowMinutes < startMin) {
            status = 'Upcoming';
          } else if (nowMinutes >= endMin) {
            status = 'Completed';
          } else {
            status = 'Ongoing';
          }
        }

        acc.push({
          ...cls,
          className: cs.name || 'Unknown Class',
          year: cs.years,
          semester: cs.semester,
          section: cs.section,
          professorName,
          status
        });

        return acc;
      }, []);

      // Sort ascending by startTime
      enrichedClasses.sort((a, b) => toMinutes(a.startTime) - toMinutes(b.startTime));

      return enrichedClasses;
    },
    refetchInterval: 60 * 1000, // Re-evaluate statuses every minute
  });
};
