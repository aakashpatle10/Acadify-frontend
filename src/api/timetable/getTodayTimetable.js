import axios from '../../lib/apiClient';

export const getTodayTimetable = async () => {
  const res = await axios.get('/timetable/today');
  return res.data?.data || [];
};
