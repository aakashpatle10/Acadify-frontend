import React, { useState } from 'react';
import { BsCalendar4, BsClockFill, BsPeople, BsGraphUp } from 'react-icons/bs';
import { MdOutlineAssignment, MdMessage } from 'react-icons/md';
import { FaChalkboardTeacher } from 'react-icons/fa';
import AttendanceOverlay from '../components/AttendanceOverlay.jsx';
import { useTodayClasses } from '../hooks/teacherApi.jsx';

const TeacherDashboard = () => {
  const [showAttendance, setShowAttendance] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const DEBUG_SHOW_BUTTONS = true; 

  const { data: todaysClasses, isLoading, isError } = useTodayClasses();

  const handleAttendanceClick = (classItem) => {
    setSelectedClass(classItem);
    setShowAttendance(true);
  };

  const stats = [
    { title: "Average Attendance", value: "87%", icon: <BsGraphUp />, color: "blue" },
    { title: "Total Students", value: "115", icon: <BsPeople />, color: "green" },
    { title: "Classes This Month", value: "24", icon: <FaChalkboardTeacher />, color: "purple" },
    { title: "Pending Grading", value: "12", icon: <MdOutlineAssignment />, color: "orange" }
  ];

  const getClassStatus = (startTime, endTime) => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const parseTime = (timeStr) => {
      const [hour, min] = timeStr.split(':').map(Number);
      return hour * 60 + min;
    };

    const startMinutes = parseTime(startTime);
    let endMinutes = parseTime(endTime);

    if (endMinutes < startMinutes && endMinutes < 720) {
      endMinutes += 12 * 60;
    }

    if (currentTime < startMinutes) return 'upcoming';
    if (currentTime >= startMinutes && currentTime <= endMinutes) return 'ongoing';
    return 'completed';
  };

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
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome back, Dr. Johnson!</h1>
        <p className="text-gray-500 mt-1">Here's your teaching overview for today</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
                <h2 className="text-3xl font-bold text-gray-900">{stat.value}</h2>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-50 text-${stat.color}-500 text-xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Today's Classes</h2>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">View Schedule</button>
          </div>

          
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}

          {isError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <p className="text-red-600 font-medium">Failed to load today's classes</p>
              <p className="text-red-500 text-sm mt-1">Please try refreshing the page</p>
            </div>
          )}

          {!isLoading && !isError && (
            <div className="space-y-4">
              {todaysClasses && todaysClasses.length > 0 ? (
                todaysClasses.map((classItem, index) => {
                  const status = getClassStatus(classItem.startTime, classItem.endTime);
                  return (
                    <div key={classItem._id || index} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="space-y-1">
                          <h3 className="font-semibold text-gray-900 text-lg">{classItem.subject}</h3>
                          <div className="text-sm text-gray-500 flex items-center gap-2">
                            <span>{classItem.startTime} - {classItem.endTime}</span>
                            <span>•</span>
                            <span>{classItem.classSessionId?.name || 'N/A'}</span>
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-3 mt-2">
                            <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">{classItem.day}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-3 w-full sm:w-auto">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${status === 'completed' ? 'bg-green-100 text-green-700' :
                              status === 'ongoing' ? 'bg-blue-100 text-blue-700 animate-pulse' :
                                'bg-gray-100 text-gray-700'
                            }`}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </span>

                          {(DEBUG_SHOW_BUTTONS || status === "ongoing" || status === "upcoming") && (
                            <button
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors w-full sm:w-auto"
                              onClick={() => handleAttendanceClick(classItem)}
                            >
                              {status === "upcoming" ? "Start Class" : "Take Attendance"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
                  <p className="text-gray-600 font-medium">No classes scheduled for today</p>
                  <p className="text-gray-500 text-sm mt-1">Enjoy your day off!</p>
                </div>
              )}
            </div>
          )}
        </div>

        <AttendanceOverlay
          isOpen={showAttendance}
          onClose={() => setShowAttendance(false)}
          classInfo={selectedClass || {}}
        />

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <button key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1 flex flex-col items-center justify-center gap-3 text-center h-32 group">
                <span className={`text-2xl ${action.color} group-hover:scale-110 transition-transform`}>{action.icon}</span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{action.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Attendance</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div>
                <h3 className="font-semibold text-gray-900">Advanced Mathematics</h3>
                <p className="text-sm text-gray-500">Today</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-gray-900">24/28</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                  85%
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div>
                <h3 className="font-semibold text-gray-900">Calculus I</h3>
                <p className="text-sm text-gray-500">Yesterday</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-gray-900">29/32</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  90%
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div>
                <h3 className="font-semibold text-gray-900">Statistics</h3>
                <p className="text-sm text-gray-500">Yesterday</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-gray-900">22/25</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                  88%
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div>
                <h3 className="font-semibold text-gray-900">Linear Algebra</h3>
                <p className="text-sm text-gray-500">2 days ago</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-gray-900">28/30</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  93%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 font-medium">
                  Room change: Statistics class moved to Room 205
                </p>
                <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 font-medium">
                  Substitution request approved for tomorrow
                </p>
                <p className="text-xs text-gray-500 mt-1">3 hours ago</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 font-medium">
                  12 assignments pending review
                </p>
                <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 font-medium">
                  New student enrolled in Calculus I
                </p>
                <p className="text-xs text-gray-500 mt-1">1 day ago</p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700 hover:underline">
              View All Notifications
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherDashboard;