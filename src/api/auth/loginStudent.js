import axios from '../../lib/apiClient';

export const loginStudent = async (credentials) => {
  const res = await axios.post('/student/login', credentials);
  return res.data;
};
