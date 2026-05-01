import axios from '../../lib/apiClient';

export const resetStudentPassword = async (data) => {
  const res = await axios.put('/student/reset-password', data);
  return res.data;
};
