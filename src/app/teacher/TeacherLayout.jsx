import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/ui/Sidebar.jsx'
import Navbar from '../../components/ui/Navbar.jsx'
import { useSelector } from 'react-redux'

const TeacherLayout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { user } = useSelector((state) => state.auth)
    const teacherName = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || user?.name || user?.fullName || 'Teacher'

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {}
            <Sidebar
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                userType="teacher"
            />

            {}
            <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
                {}
                <Navbar
                    toggleMobileMenu={toggleMobileMenu}
                    portalType="Teacher Portal"
                    userName={teacherName}
                />

                {}
                <main
                    id="main-scroll-container"
                    className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto"
                >
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default TeacherLayout
