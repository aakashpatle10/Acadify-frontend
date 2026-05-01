import axios from '../../lib/apiClient';

export const createTeacher = async (data) => {
  const res = await axios.post('/teacher', data);
  return res.data;
};
