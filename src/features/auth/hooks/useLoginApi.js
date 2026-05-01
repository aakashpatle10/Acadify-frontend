import { useMutation } from '@tanstack/react-query';
import { loginAdmin, loginStudent, loginTeacher } from '../../../api';

export const useAdminLogin = () => {
    return useMutation({
        mutationFn: (credentials) => loginAdmin(credentials),
    });
};

export const useStudentLogin = () => {
    return useMutation({
        mutationFn: (credentials) => loginStudent(credentials),
    });
};

export const useTeacherLogin = () => {
    return useMutation({
        mutationFn: (credentials) => loginTeacher(credentials),
    });
};
