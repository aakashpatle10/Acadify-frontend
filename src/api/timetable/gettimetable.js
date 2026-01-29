import api from "../../config/axios";


export const getMyTimetable = async () => {
    console.log('🌐 API Call: Fetching /timetable/my');
    const response = await api.get('/timetable/my');
    console.log('📦 API Response:', response.data);
    return response.data?.data;
};


export const getTimetable = getMyTimetable;
