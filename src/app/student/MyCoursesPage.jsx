import React, { useState } from 'react';
import {
    LuBookOpen,
    LuCalendarDays,
    LuEllipsis,
    LuPlus,
    LuSearch,
} from 'react-icons/lu';

const MyCourses = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    
    const courses = [
        {
            id: 1,
            code: 'MATH301',
            name: 'Advanced Mathematics',
            instructor: 'Dr. Sarah Johnson',
            progress: 78,
            currentGrade: 'A-',
            attendance: 92,
            assignments: { completed: 8, total: 10 },
            nextClass: {
                date: 'Jun 25 at 09:00 AM',
                room: 'Room 301'
            },
            status: 'Active',
            color: 'blue'
        },
        {
            id: 2,
            code: 'PHYS201',
            name: 'Physics Laboratory',
            instructor: 'Prof. Michael Brown',
            progress: 85,
            currentGrade: 'B+',
            attendance: 88,
            assignments: { completed: 6, total: 7 },
            nextClass: {
                date: 'Jun 25 at 02:00 PM',
                room: 'Lab 101'
            },
            status: 'Active',
            color: 'green'
        },
        {
            id: 3,
            code: 'CHEM101',
            name: 'Chemistry Fundamentals',
            instructor: 'Dr. Emily Wilson',
            progress: 92,
            currentGrade: 'A',
            attendance: 95,
            assignments: { completed: 9, total: 9 },
            nextClass: {
                date: 'Jun 26 at 10:30 AM',
                room: 'Lab 203'
            },
            status: 'Active',
            color: 'purple'
        },
        {
            id: 4,
            code: 'ENG205',
            name: 'English Literature',
            instructor: 'Dr. Amanda Clark',
            progress: 65,
            currentGrade: 'B',
            attendance: 87,
            assignments: { completed: 5, total: 8 },
            nextClass: {
                date: 'Jun 25 at 04:00 PM',
                room: 'Room 105'
            },
            status: 'Active',
            color: 'orange'
        },
        {
            id: 5,
            code: 'CS101',
            name: 'Computer Science Basics',
            instructor: 'Dr. Robert Kim',
            progress: 100,
            currentGrade: 'A+',
            attendance: 98,
            assignments: { completed: 12, total: 12 },
            nextClass: null,
            status: 'Completed',
            color: 'blue'
        },
        {
            id: 6,
            code: 'STAT201',
            name: 'Statistics & Probability',
            instructor: 'Dr. Lisa Zhang',
            progress: 45,
            currentGrade: 'B-',
            attendance: 82,
            assignments: { completed: 4, total: 9 },
            nextClass: {
                date: 'Jun 27 at 11:00 AM',
                room: 'Room 202'
            },
            status: 'Active',
            color: 'pink'
        }
    ];

    
    const colorClasses = {
        blue: {
            dot: 'bg-blue-500',
            progress: 'bg-blue-500',
            badge: 'bg-blue-50 text-blue-600'
        },
        green: {
            dot: 'bg-green-500',
            progress: 'bg-green-500',
            badge: 'bg-green-50 text-green-600'
        },
        purple: {
            dot: 'bg-purple-500',
            progress: 'bg-purple-500',
            badge: 'bg-purple-50 text-purple-600'
        },
        orange: {
            dot: 'bg-orange-500',
            progress: 'bg-orange-500',
            badge: 'bg-orange-50 text-orange-600'
        },
        pink: {
            dot: 'bg-pink-500',
            progress: 'bg-pink-500',
            badge: 'bg-pink-50 text-pink-600'
        }
    };

    
    const filteredCourses = courses.filter(course => {
        const matchesTab =
            activeTab === 'all' ? true :
                activeTab === 'active' ? course.status === 'Active' :
                    activeTab === 'completed' ? course.status === 'Completed' : true;

        const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.code.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesTab && matchesSearch;
    });

    return (
        <div>
            {}
            <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
                        <p className="text-gray-600">Manage your enrolled courses and track progress</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                            <LuPlus className="text-lg" />
                            <span>Enroll Course</span>
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                            <LuCalendarDays className="w-5 h-5" />
                            <span>View Schedule</span>
                        </button>
                    </div>
                </div>

                {}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'all'
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                                }`}
                        >
                            All Courses
                        </button>
                        <button
                            onClick={() => setActiveTab('active')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'active'
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                                }`}
                        >
                            Active
                        </button>
                        <button
                            onClick={() => setActiveTab('completed')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'completed'
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                                }`}
                        >
                            Completed
                        </button>
                    </div>

                    <div className="flex-1 max-w-md">
                        <div className="relative">
                            <LuSearch
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                            />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                    <div
                        key={course.id}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                    >
                        {}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${colorClasses[course.color].dot}`}></div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{course.code}</h3>
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${course.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                                }`}>
                                {course.status}
                            </span>
                        </div>

                        {}
                        <h2 className="text-xl font-bold text-gray-900 mb-2">{course.name}</h2>
                        <p className="text-sm text-gray-600 mb-4">{course.instructor}</p>

                        {}
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-600">Progress</span>
                                <span className="text-sm font-semibold text-gray-900">{course.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full ${colorClasses[course.color].progress}`}
                                    style={{ width: `${course.progress}%` }}
                                ></div>
                            </div>
                        </div>

                        {}
                        <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-100">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Current Grade</p>
                                <p className="text-2xl font-bold text-gray-900">{course.currentGrade}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Attendance</p>
                                <p className="text-2xl font-bold text-gray-900">{course.attendance}%</p>
                            </div>
                        </div>

                        {}
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-600">Assignments</span>
                                <span className="text-sm font-semibold text-gray-900">
                                    {course.assignments.completed}/{course.assignments.total}
                                </span>
                            </div>
                            <div className="flex gap-1">
                                {Array.from({ length: course.assignments.total }).map((_, index) => (
                                    <div
                                        key={index}
                                        className={`flex-1 h-2 rounded-full ${index < course.assignments.completed
                                                ? 'bg-green-500'
                                                : 'bg-gray-200'
                                            }`}
                                    ></div>
                                ))}
                            </div>
                        </div>

                        {}
                        {course.nextClass && (
                            <div className="bg-blue-50 rounded-lg p-3 mb-4">
                                <div className="flex items-start gap-2">
                                    <LuCalendarDays className="w-5 h-5 text-blue-600 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-xs font-semibold text-blue-900 mb-1">Next Class:</p>
                                        <p className="text-sm text-blue-700">{course.nextClass.date} • {course.nextClass.room}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {}
                        <div className="flex gap-2">
                            <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                                <LuBookOpen className="w-4 h-4" />
                                <span className="text-sm font-medium">View Details</span>
                            </button>
                            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                <LuEllipsis className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {}
            {filteredCourses.length === 0 && (
                <div className="text-center py-12">
                    <LuBookOpen className="text-6xl mb-4 mx-auto text-gray-400" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Browse All Courses
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyCourses;
