import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/ui/Sidebar.jsx'
import Navbar from '../../components/ui/Navbar.jsx'
import ChatBot from '../../features/student/components/chatbot/index.jsx'

const StudentLayout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <div className="flex min-h-screen bg-gray-50 overflow-hidden">
            {}
            <Sidebar
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                userType="student"
            />

            {}
            <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
                {}
                <Navbar toggleMobileMenu={toggleMobileMenu} />

                {}
                <main
                    id="main-scroll-container"
                    className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto"
                >
                    <Outlet />
                </main>
            </div>
            
            <ChatBot />
        </div>
    )
}

export default StudentLayout