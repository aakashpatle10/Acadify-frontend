import React from 'react';
import { useTodaySchedule } from '../hooks/useTodaySchedule';

const STATUS_STYLES = {
  Upcoming:  { badge: 'bg-blue-100 text-blue-700',    border: 'border-blue-400',   card: '' },
  Ongoing:   { badge: 'bg-emerald-100 text-emerald-700 animate-pulse', border: 'border-emerald-500', card: 'bg-emerald-50 ring-2 ring-emerald-200' },
  Completed: { badge: 'bg-gray-100 text-gray-500',    border: 'border-gray-300',   card: 'opacity-60' },
  Unknown:   { badge: 'bg-gray-100 text-gray-400',    border: 'border-gray-200',   card: '' },
};

const TodaySchedule = () => {
  const { data: classes, isLoading, isError } = useTodaySchedule();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-6">
        <p className="text-red-500 font-medium text-sm">Failed to load today's schedule</p>
        <p className="text-gray-400 text-xs mt-1">Please refresh the page</p>
      </div>
    );
  }

  if (!classes || classes.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-sm font-medium">No classes scheduled today</p>
        <p className="text-gray-400 text-xs mt-1">Enjoy your day! 🎉</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {classes.map((cls, index) => {
        const styles = STATUS_STYLES[cls.status] || STATUS_STYLES.Unknown;
        return (
          <div
            key={cls._id || index}
            className={`flex items-stretch gap-0 rounded-xl border overflow-hidden transition-all ${styles.card}`}
          >
            <div className={`w-1 flex-shrink-0 ${styles.border} border-l-4 border-y-0 border-r-0`} />

            <div className="flex flex-1 items-center justify-between p-4 gap-3">
              <div className="min-w-0 space-y-1">
                <h3 className="text-sm font-bold text-gray-900 truncate">
                  {cls.className}
                </h3>
                
                <div className="text-xs text-gray-600">
                  <p className="font-medium">{cls.professorName}</p>
                  <p>Subject: {cls.subject}</p>
                </div>

                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">
                  {cls.day} &nbsp;·&nbsp; {cls.startTime} – {cls.endTime}
                </p>

                <p className="text-[10px] text-blue-600 font-semibold uppercase">
                  Year {cls.year} &nbsp;·&nbsp; Sem {cls.semester} &nbsp;·&nbsp; Section {cls.section}
                </p>
              </div>

              <span className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${styles.badge}`}>
                {cls.status}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TodaySchedule;
