import React from 'react';
import { useTodayClasses } from '../hooks/useTodayClasses';
import { BsClockHistory, BsPlayCircleFill, BsCheckCircleFill } from 'react-icons/bs';
import dayjs from 'dayjs';

const STATUS_CONFIG = {
  Upcoming: {
    badge: 'bg-blue-100 text-blue-700 border border-blue-200',
    card: 'border-gray-100 opacity-80',
    icon: <BsClockHistory className="text-blue-500" />,
  },
  Ongoing: {
    badge: 'bg-emerald-100 text-emerald-700 border border-emerald-300 animate-pulse',
    card: 'border-emerald-400 shadow-emerald-100 shadow-md ring-2 ring-emerald-200',
    icon: <BsPlayCircleFill className="text-emerald-500" />,
  },
  Completed: {
    badge: 'bg-gray-100 text-gray-500 border border-gray-200',
    card: 'border-gray-100 opacity-60',
    icon: <BsCheckCircleFill className="text-gray-400" />,
  },
  Unknown: {
    badge: 'bg-gray-100 text-gray-400',
    card: 'border-gray-100',
    icon: null,
  },
};

const TodayClasses = ({ onTakeAttendance }) => {
  const { data: todaysClasses, isLoading, isError } = useTodayClasses();

  const firstOngoingId = todaysClasses?.find(c => c.status === 'Ongoing')?._id;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-600 font-medium">Failed to load today's classes</p>
        <p className="text-red-500 text-sm mt-1">Please try refreshing the page</p>
      </div>
    );
  }

  if (!todaysClasses || todaysClasses.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
        <p className="text-gray-600 font-medium text-lg">You're free today 🎉</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todaysClasses.map((classItem, index) => {
        const { 
          subject, 
          startTime, 
          endTime, 
          status, 
          className, 
          professorName, 
          year, 
          semester, 
          section,
          day 
        } = classItem;

        const formatTime = (timeStr) => {
          if (!timeStr) return '--';
          if (timeStr.toLowerCase().includes('m')) return timeStr;
          return dayjs(`2000-01-01 ${timeStr}`).format('h:mm A');
        };

        const config = STATUS_CONFIG[status] || STATUS_CONFIG.Unknown;
        const isActiveOngoing = status === 'Ongoing' && classItem._id === firstOngoingId;

        return (
          <div
            key={classItem._id || index}
            className={`bg-white p-4 sm:p-5 rounded-xl border transition-all ${config.card}`}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-start gap-3 w-full">
                <div className="mt-1 text-lg">{config.icon}</div>
                <div className="space-y-1 w-full">
                  <h3 className="font-bold text-gray-900 text-base">
                    {className}
                  </h3>
                  
                  <div className="text-xs text-gray-600 font-medium">
                    <p>{professorName}</p>
                    <p className="mt-0.5">Subject: {subject}</p>
                  </div>
                  
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">
                    {day} &nbsp;·&nbsp; {formatTime(startTime)} – {formatTime(endTime)}
                  </p>

                  <p className="text-[10px] text-blue-600 font-semibold uppercase">
                    Year {year} &nbsp;·&nbsp; Sem {semester} &nbsp;·&nbsp; Section {section}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${config.badge}`}>
                  {status}
                </span>

                {isActiveOngoing && (
                  <button
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm hover:shadow-md flex items-center gap-1.5 uppercase"
                    onClick={() => onTakeAttendance && onTakeAttendance(classItem)}
                  >
                    <BsPlayCircleFill size={12} />
                    Take Attendance
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TodayClasses;
