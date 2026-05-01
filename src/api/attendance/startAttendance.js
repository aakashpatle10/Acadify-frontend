import axios from '../../lib/apiClient';

export const startAttendance = async (data) => {
  const res = await axios.post('/class-session/attendance/start', data);
  return res.data;
};
