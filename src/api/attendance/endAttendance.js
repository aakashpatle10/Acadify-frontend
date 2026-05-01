import axios from '../../lib/apiClient';

export const endAttendance = async (data) => {
  const res = await axios.post('/student/attendance/mark', data);
  return res.data;
};
