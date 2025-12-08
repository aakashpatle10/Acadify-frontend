import api from "../../config/axios";

// Get logged-in teacher's timetable
export const getMyTimetable = async () => {
    console.log('🌐 API Call: Fetching /timetable/my');
    const response = await api.get('/timetable/my');
    console.log('📦 API Response:', response.data);
    return response.data?.data;
};

// Legacy export for backward compatibility
export const getTimetable = getMyTimetable;
