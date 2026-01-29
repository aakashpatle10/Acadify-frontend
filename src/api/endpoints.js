import axiosInstance from '../config/axios/';


export const adminAPI = {
    
    login: async (credentials) => {
        const response = await axiosInstance.post('/admin/login', credentials);
        return response.data;
    },

    
    getAllAdmins: async () => {
        const response = await axiosInstance.get('/admin');
        return response.data;
    },

    
    createSubAdmin: async (data) => {
        const response = await axiosInstance.post('/admin', data);
        return response.data;
    },

    
    resetPassword: async (data) => {
        const response = await axiosInstance.put('/admin/reset-password', data);
        return response.data;
    },
};

export const attendanceAPI = {
  markAttendance: async (data) => {
    const response = await axiosInstance.post(
      "/student/attendance/mark",
      data
    );
    return response.data;
  }
};

export const studentAPI = {
    
    login: async (credentials) => {
        const response = await axiosInstance.post('/student/login', credentials);
        return response.data;
    },

    
    getAllStudents: async () => {
        const response = await axiosInstance.get('/student');
        return response.data;
    },

    
    createStudent: async (data) => {
        const response = await axiosInstance.post('/student', data);
        return response.data;
    },

    
    getStudentById: async (id) => {
        const response = await axiosInstance.get(`/student/${id}`);
        return response.data;
    },

    
    updateStudent: async (id, data) => {
        const response = await axiosInstance.put(`/student/${id}`, data);
        return response.data;
    },

    
    deleteStudent: async (id) => {
        const response = await axiosInstance.delete(`/student/${id}`);
        return response.data;
    },

    
    resetPassword: async (data) => {
        const response = await axiosInstance.put('/student/reset-password', data);
        return response.data;
    },
};


export const teacherAPI = {
    
    login: async (credentials) => {
        const response = await axiosInstance.post('/teacher/login', credentials);
        return response.data;
    },

    
    getAllTeachers: async () => {
        const response = await axiosInstance.get('/teacher');
        return response.data;
    },

    
    createTeacher: async (data) => {
        const response = await axiosInstance.post('/teacher', data);
        return response.data;
    },

    
    getTeacherById: async (id) => {
        const response = await axiosInstance.get(`/teacher/${id}`);
        return response.data;
    },

    
    updateTeacher: async (id, data) => {
        const response = await axiosInstance.put(`/teacher/${id}`, data);
        return response.data;
    },

    
    deleteTeacher: async (id) => {
        const response = await axiosInstance.delete(`/teacher/${id}`);
        return response.data;
    },
};

export default {
    admin: adminAPI,
    student: studentAPI,
    teacher: teacherAPI,
};
