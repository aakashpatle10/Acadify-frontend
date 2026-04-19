import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { fetchTodayScheduleService } from '../services/timetable.service';
import { useSelector } from 'react-redux';

dayjs.extend(customParseFormat);

const toMinutes = (timeStr) => {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
};

export const useTodaySchedule = () => {
  const user = useSelector((state) => state.auth.user);
  
  return useQuery({
    queryKey: ['studentTodaySchedule', user?._id],
    queryFn: async () => {
      const allTodayClasses = await fetchTodayScheduleService();

      if (!Array.isArray(allTodayClasses)) return [];

      const nowMinutes = toMinutes(dayjs().format('HH:mm'));

      // Filter and Validate: Match student's year, semester, section from ClassSession
      const enrichedClasses = allTodayClasses.reduce((acc, cls) => {
        const cs = cls.classSessionId;
        
        // STRICT VALIDATION: Ensure ClassSession fields exist
        if (!cs || !cs.years || !cs.semester || !cs.section) {
          return acc; // Skip broken records
        }

        // STUDENT FILTER LOGIC:
        // classSession.years === student.year AND ...
        const matchesStudent = 
          Number(cs.years) === Number(user?.year) && 
          Number(cs.semester) === Number(user?.semester) && 
          String(cs.section).toLowerCase() === String(user?.section).toLowerCase();

        if (!matchesStudent) return acc;

        const t = cls.teacherId;
        const professorName = t
          ? `Prof. ${[t.firstName, t.lastName].filter(Boolean).join(' ') || t.name || 'Unknown'}`
          : 'Prof. Unknown';

        let status = 'Unknown';
        if (cls.startTime && cls.endTime) {
          const startMin = toMinutes(cls.startTime);
          const endMin   = toMinutes(cls.endTime);

          if (nowMinutes < startMin)      status = 'Upcoming';
          else if (nowMinutes > endMin)   status = 'Completed';
          else                            status = 'Ongoing';
        }

        acc.push({ 
          ...cls, 
          status, 
          professorName,
          className: cs.name || 'Unknown Class',
          year: cs.years,
          semester: cs.semester,
          section: cs.section
        });

        return acc;
      }, []);

      // Sort ascending by startTime
      enrichedClasses.sort((a, b) => toMinutes(a.startTime) - toMinutes(b.startTime));

      return enrichedClasses;
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchInterval: 60 * 1000,
  });
};
