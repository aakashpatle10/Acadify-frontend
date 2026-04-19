import React, { useState } from 'react';
import { BsCalendar4, BsClockFill, BsPeople, BsGraphUp } from 'react-icons/bs';
import { MdOutlineAssignment, MdMessage } from 'react-icons/md';
import { FaChalkboardTeacher } from 'react-icons/fa';
import AttendanceOverlay from '../components/AttendanceOverlay.jsx';
import TodayClasses from '../components/TodayClasses.jsx';
import { useSelector } from 'react-redux';


// 🔹 Reusable Components

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
      </div>
      <div className={`p-3 rounded-lg bg-${color}-50 text-${color}-500 text-xl`}>
        {icon}
      </div>
    </div>
  </div>
);

const SectionCard = ({ title, children, action }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      {action}
    </div>
    {children}
  </div>
);

const NotificationItem = ({ text, time, color }) => (
  <div className={`flex items-start gap-3 p-4 bg-${color}-50 rounded-lg border-l-4 border-${color}-500`}>
    <div className={`w-2 h-2 bg-${color}-500 rounded-full mt-2`}></div>
    <div className="flex-1">
      <p className="text-sm text-gray-900 font-medium">{text}</p>
      <p className="text-xs text-gray-500 mt-1">{time}</p>
    </div>
  </div>
);


// 🔹 Main Component

const TeacherDashboard = () => {
  const [showAttendance, setShowAttendance] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const user = useSelector((state) => state.auth.user);
  const teacherName =
    [user?.firstName, user?.lastName].filter(Boolean).join(' ') ||
    user?.name ||
    user?.fullName ||
    'Teacher';

  const handleAttendanceClick = (classItem) => {
    setSelectedClass(classItem);
    setShowAttendance(true);
  };

  const stats = [
    { title: "Total Students", value: "115", icon: <BsPeople />, color: "green" },
    { title: "Classes This Month", value: "24", icon: <FaChalkboardTeacher />, color: "purple" },
    { title: "Pending Grading", value: "12", icon: <MdOutlineAssignment />, color: "orange" }
  ];

  const quickActions = [
    { title: "Take Attendance", icon: <BsCalendar4 />, color: "text-blue-500" },
    { title: "Schedule Class", icon: <BsClockFill />, color: "text-green-500" },
    { title: "Create Assignment", icon: <MdOutlineAssignment />, color: "text-purple-500" },
    { title: "View Reports", icon: <BsGraphUp />, color: "text-orange-500" },
    { title: "Substitution", icon: <FaChalkboardTeacher />, color: "text-blue-500" },
    { title: "Message Students", icon: <MdMessage />, color: "text-purple-500" }
  ];

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Welcome back, Prof. {teacherName}!
        </h1>
        <p className="text-gray-500 mt-1">
          Here's your teaching overview for today
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Today's Classes */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Today's Classes</h2>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
              View Schedule
            </button>
          </div>

          {/* Scrollable class list — max 420px so it fits alongside Quick Actions */}
          <div className="relative">
            <div className="max-h-[420px] overflow-y-auto pr-1 space-y-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
              <TodayClasses onTakeAttendance={handleAttendanceClick} />
            </div>
            {/* Fade hint at bottom */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-50 to-transparent rounded-b-xl" />
          </div>
        </div>

        {/* Attendance Overlay */}
        <AttendanceOverlay
          isOpen={showAttendance}
          onClose={() => setShowAttendance(false)}
          classInfo={selectedClass || {}}
        />

        {/* Quick Actions */}
        <div className="space-y-6">
          <SectionCard title="Quick Actions">
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1 flex flex-col items-center justify-center gap-3 text-center h-32 group"
                >
                  <span className={`text-2xl ${action.color} group-hover:scale-110 transition-transform`}>
                    {action.icon}
                  </span>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {action.title}
                  </span>
                </button>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

        {/* Recent Attendance */}
        <SectionCard title="Recent Attendance">
          <div className="space-y-4">
            {[
              { subject: "Advanced Mathematics", time: "Today", count: "24/28", percent: "85%", color: "yellow" },
              { subject: "Calculus I", time: "Yesterday", count: "29/32", percent: "90%", color: "green" },
              { subject: "Statistics", time: "Yesterday", count: "22/25", percent: "88%", color: "yellow" },
              { subject: "Linear Algebra", time: "2 days ago", count: "28/30", percent: "93%", color: "green" }
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                <div>
                  <h3 className="font-semibold text-gray-900">{item.subject}</h3>
                  <p className="text-sm text-gray-500">{item.time}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold">{item.count}</span>
                  <span className={`px-3 py-1 bg-${item.color}-100 text-${item.color}-700 rounded-full text-xs font-medium`}>
                    {item.percent}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Notifications */}
        <SectionCard
          title="Notifications"
          action={
            <button className="text-blue-600 text-sm hover:underline">
              View All
            </button>
          }
        >
          <div className="space-y-4">
            <NotificationItem text="Room change: Statistics class moved to Room 205" time="1 hour ago" color="blue" />
            <NotificationItem text="Substitution request approved for tomorrow" time="3 hours ago" color="green" />
            <NotificationItem text="12 assignments pending review" time="5 hours ago" color="orange" />
            <NotificationItem text="New student enrolled in Calculus I" time="1 day ago" color="purple" />
          </div>
        </SectionCard>

      </div>
    </>
  );
};

export default TeacherDashboard;