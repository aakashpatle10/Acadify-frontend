import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../../../../../config/store/authSlice';
import { useAdminLogin, useStudentLogin, useTeacherLogin } from '../api/useLogin';
import { USER_ROLES } from '../../../../../types';

export const useLoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        enrollmentNumber: '',
        password: '',
    });
    const [selectedRole, setSelectedRole] = useState(USER_ROLES.STUDENT);
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const adminLogin = useAdminLogin();
    const studentLogin = useStudentLogin();
    const teacherLogin = useTeacherLogin();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError(''); 
    };

    const handleRoleChange = (role) => {
        setSelectedRole(role);
        setError('');
        
        setFormData({
            email: '',
            enrollmentNumber: '',
            password: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            let response;

            
            if (selectedRole === USER_ROLES.ADMIN || selectedRole === USER_ROLES.SUB_ADMIN) {
                if (!formData.email || !formData.password) {
                    setError('Please enter email and password');
                    return;
                }
                response = await adminLogin.mutateAsync({
                    email: formData.email,
                    password: formData.password,
                });
            } else if (selectedRole === USER_ROLES.STUDENT) {
                if (!formData.enrollmentNumber || !formData.password) {
                    setError('Please enter enrollment number and password');
                    return;
                }
                response = await studentLogin.mutateAsync({
                    enrollmentNumber: formData.enrollmentNumber,
                    password: formData.password,
                });
            } else if (selectedRole === USER_ROLES.TEACHER) {
                if (!formData.email || !formData.password) {
                    setError('Please enter email and password');
                    return;
                }
                response = await teacherLogin.mutateAsync({
                    email: formData.email,
                    password: formData.password,
                });
            }

            
            if (response?.data) {
                const { token, admin, student, teacher } = response.data;
                const user = admin || student || teacher;

                dispatch(setCredentials({
                    user,
                    token,
                }));

                
                if (admin) {
                    navigate('/admin');
                } else if (student) {
                    navigate('/student');
                } else if (teacher) {
                    navigate('/teacher');
                }
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(
                err.response?.data?.message ||
                'Login failed. Please check your credentials and try again.'
            );
        }
    };

    const isLoading = adminLogin.isPending || studentLogin.isPending || teacherLogin.isPending;

    return {
        formData,
        selectedRole,
        error,
        isLoading,
        handleInputChange,
        handleRoleChange,
        handleSubmit,
    };
};
