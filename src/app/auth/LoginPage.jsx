import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
    LuCopy,
    LuGraduationCap,
    LuIdCard,
    LuLoaderCircle,
    LuLock,
    LuMail,
    LuShieldCheck,
    LuUserRound,
    LuX,
} from 'react-icons/lu'
import { useLoginForm } from '../../features/auth/hooks/useLoginForm'
import { USER_ROLES } from "../../types"

const Login = () => {
    const navigate = useNavigate();
    const { isAuthenticated, role } = useSelector((state) => state.auth);
    const [showDemoPopup, setShowDemoPopup] = useState(false);

    const {
        formData,
        selectedRole,
        error,
        isLoading,
        handleInputChange,
        handleRoleChange,
        handleSubmit,
    } = useLoginForm();

    useEffect(() => {
        if (isAuthenticated && role) {
            if (role === 'admin' || role === 'main_admin' || role === 'sub_admin') {
                navigate('/admin', { replace: true });
            } else if (role === 'teacher') {
                navigate('/teacher', { replace: true });
            } else if (role === 'student') {
                navigate('/student', { replace: true });
            }
        }
    }, [isAuthenticated, role, navigate]);

    const roles = [
        { id: USER_ROLES.STUDENT, label: 'Student', icon: LuUserRound },
        { id: USER_ROLES.TEACHER, label: 'Teacher', icon: LuGraduationCap },
        { id: USER_ROLES.ADMIN, label: 'Admin', icon: LuShieldCheck }
    ]

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-3">
            <div className="w-full max-w-md">
                <div className="text-center mb-3">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg mb-2 transform hover:scale-105 transition-transform duration-300">
                        <LuGraduationCap className="text-white text-2xl" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-1" style={{ fontFamily: 'cursive' }}>
                        Acadify
                    </h1>
                    <p className="text-xs text-gray-600 font-medium">Smart Curriculum & Attendance System</p>
                </div>

                <div className="bg-white rounded-xl shadow-xl p-4 backdrop-blur-sm">
                    <div className="mb-3">
                        <h2 className="text-gray-700 font-semibold mb-2 text-sm">Select Your Role</h2>
                        <div className="grid grid-cols-3 gap-2">
                            {roles.map((role) => {
                                const Icon = role.icon
                                return (
                                    <button
                                        key={role.id}
                                        onClick={() => handleRoleChange(role.id)}
                                        type="button"
                                        className={`flex flex-col items-center justify-center p-2.5 rounded-lg border-2 transition-all duration-300 ${selectedRole === role.id
                                            ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-md'
                                            : 'border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:bg-blue-50/50'
                                            }`}
                                    >
                                        <Icon className="text-lg mb-1" />
                                        <span className="text-xs font-medium">{role.label}</span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-xs text-red-600 font-medium">{error}</p>
                            </div>
                        )}

                        <div className="mb-3">
                            <label className="block text-gray-700 font-medium mb-1.5 text-xs">
                                {selectedRole === USER_ROLES.STUDENT ? 'Enrollment Number' : 'Email Address'}
                            </label>
                            <div className="relative">
                                {selectedRole === USER_ROLES.STUDENT ? (
                                    <LuIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                                ) : (
                                    <LuMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                                )}
                                <input
                                    type={selectedRole === USER_ROLES.STUDENT ? 'text' : 'email'}
                                    name={selectedRole === USER_ROLES.STUDENT ? 'enrollmentNumber' : 'email'}
                                    value={selectedRole === USER_ROLES.STUDENT ? formData.enrollmentNumber : formData.email}
                                    onChange={handleInputChange}
                                    placeholder={selectedRole === USER_ROLES.STUDENT ? 'Enter your enrollment number' : 'Enter your institutional email'}
                                    className="w-full pl-10 pr-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors duration-300 text-gray-700"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="block text-gray-700 font-medium mb-1.5 text-xs">
                                Password
                            </label>
                            <div className="relative">
                                <LuLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter your password"
                                    className="w-full pl-10 pr-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors duration-300 text-gray-700"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-2.5 text-sm rounded-lg transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${isLoading
                                ? 'opacity-70 cursor-not-allowed'
                                : 'hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transform hover:-translate-y-0.5'
                                }`}
                        >
                            {isLoading ? (
                                <>
                                    <LuLoaderCircle className="animate-spin h-4 w-4 text-white" />
                                    <span>Logging in...</span>
                                </>
                            ) : (
                                <>
                                    <LuShieldCheck className="text-sm" />
                                    <span>Secure Login as {roles.find(r => r.id === selectedRole)?.label}</span>
                                </>
                            )}
                        </button>

                        <div className="text-center mt-2">
                            <a href="#" className="text-blue-600 hover:text-blue-700 text-xs font-medium hover:underline">
                                Forgot your password?
                            </a>
                        </div>

                        <div className="text-center mt-2">
                            <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                                <LuLock className="text-xs" />
                                <span>End-to-end encrypted with JWT tokens</span>
                            </p>
                            <button
                                type="button"
                                onClick={() => setShowDemoPopup(true)}
                                className="text-xs text-blue-600 hover:text-blue-700 font-medium hover:underline mt-1"
                            >
                                Demo Credentials
                            </button>
                        </div>
                    </form>
                </div>

                {showDemoPopup && (
                    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setShowDemoPopup(false)}>
                        <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-gray-800">Demo Credentials</h3>
                                <button onClick={() => setShowDemoPopup(false)} className="text-gray-500 hover:text-gray-700">
                                    <LuX className="text-xl" />
                                </button>
                            </div>

                            <div className="mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <LuUserRound className="text-blue-600" />
                                    <h4 className="font-semibold text-gray-700">Student</h4>
                                </div>
                                <div className="space-y-2 ml-6">
                                    <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                                        <div className="text-xs">
                                            <span className="text-gray-600">Enrollment No: </span>
                                            <span className="font-medium text-gray-800">123456</span>
                                        </div>
                                        <button onClick={() => copyToClipboard('123456')} className="text-blue-600 hover:text-blue-700">
                                            <LuCopy className="text-sm" />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                                        <div className="text-xs">
                                            <span className="text-gray-600">Password: </span>
                                            <span className="font-medium text-gray-800">123456</span>
                                        </div>
                                        <button onClick={() => copyToClipboard('123456')} className="text-blue-600 hover:text-blue-700">
                                            <LuCopy className="text-sm" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <LuGraduationCap className="text-blue-600" />
                                    <h4 className="font-semibold text-gray-700">Teacher</h4>
                                </div>
                                <div className="space-y-2 ml-6">
                                    <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                                        <div className="text-xs">
                                            <span className="text-gray-600">Email: </span>
                                            <span className="font-medium text-gray-800">teacher@gmail.com</span>
                                        </div>
                                        <button onClick={() => copyToClipboard('teacher@gmail.com')} className="text-blue-600 hover:text-blue-700">
                                            <LuCopy className="text-sm" />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                                        <div className="text-xs">
                                            <span className="text-gray-600">Password: </span>
                                            <span className="font-medium text-gray-800">123456</span>
                                        </div>
                                        <button onClick={() => copyToClipboard('123456')} className="text-blue-600 hover:text-blue-700">
                                            <LuCopy className="text-sm" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <LuShieldCheck className="text-blue-600" />
                                    <h4 className="font-semibold text-gray-700">Admin</h4>
                                </div>
                                <div className="space-y-2 ml-6">
                                    <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                                        <div className="text-xs">
                                            <span className="text-gray-600">Email: </span>
                                            <span className="font-medium text-gray-800">admin@gmail.com</span>
                                        </div>
                                        <button onClick={() => copyToClipboard('admin@gmail.com')} className="text-blue-600 hover:text-blue-700">
                                            <LuCopy className="text-sm" />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                                        <div className="text-xs">
                                            <span className="text-gray-600">Password: </span>
                                            <span className="font-medium text-gray-800">123456</span>
                                        </div>
                                        <button onClick={() => copyToClipboard('123456')} className="text-blue-600 hover:text-blue-700">
                                            <LuCopy className="text-sm" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Login
