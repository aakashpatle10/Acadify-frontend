import axios from '../../lib/apiClient';

export const createStudent = async (data) => {
  const res = await axios.post('/student', data);
  return res.data;
};
