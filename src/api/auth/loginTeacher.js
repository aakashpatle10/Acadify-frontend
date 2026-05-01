import axios from '../../lib/apiClient';

export const loginTeacher = async (credentials) => {
  const res = await axios.post('/teacher/login', credentials);
  return res.data;
};
