import api from '../../config/axios';

export const fetchTodayClassesService = async () => {
  const response = await api.get('/timetable/today');
  return response.data?.data || [];
};

export const startClassSessionService = async (attendanceData) => {
  const response = await api.post('/class-session/attendance/start', attendanceData);
  return response.data;
};
