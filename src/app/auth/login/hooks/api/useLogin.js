import { useMutation } from '@tanstack/react-query';
import { adminAPI, studentAPI, teacherAPI } from '../../../../../api/endpoints';

export const useAdminLogin = () => {
    return useMutation({
        mutationFn: (credentials) => adminAPI.login(credentials),
    });
};

export const useStudentLogin = () => {
    return useMutation({
        mutationFn: (credentials) => studentAPI.login(credentials),
    });
};

export const useTeacherLogin = () => {
    return useMutation({
        mutationFn: (credentials) => teacherAPI.login(credentials),
    });
};
