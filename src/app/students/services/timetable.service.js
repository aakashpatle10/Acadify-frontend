import api from '../../../config/axios/index.js';

export const fetchTodayScheduleService = async () => {
  const response = await api.get('/timetable/today');
  return response.data?.data || [];
};
