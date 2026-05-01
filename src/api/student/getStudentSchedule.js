import axios from '../../lib/apiClient';

export const getStudentSchedule = async () => {
  const res = await axios.get('/timetable/today');
  return res.data?.data || [];
};
