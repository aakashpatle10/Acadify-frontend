import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import StudentLayout from '../app/student/StudentLayout.jsx'
import StudentDashboard from '../app/student/StudentDashboardPage.jsx'
import MyCourses from '../app/student/MyCoursesPage.jsx'
import TeacherLayout from '../app/teacher/TeacherLayout.jsx'
import TeacherDashboard from '../app/teacher/TeacherDashboardPage.jsx'
import AttendancePortal from "../features/teacher/components/components/AttendancePortal.jsx";
import Login from '../app/auth/LoginPage.jsx'
import AdminLayout from '../app/admin/AdminLayout.jsx'
import AdminDashboard from '../app/admin/AdminDashboardPage.jsx'
import ProtectedRoute from '../components/hoc/ProtectedRoute.jsx'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {}
        <Route path="/" element={<Login />} />

        {}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin', 'main_admin', 'sub_admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
        </Route>

        {}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentDashboard />} />
          <Route path="courses" element={<MyCourses />} />
        </Route>

        {}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<TeacherDashboard />} />
        </Route>

        {}
        <Route
          path="/attendance"
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <AttendancePortal />
            </ProtectedRoute>
          }
        />

        {}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes