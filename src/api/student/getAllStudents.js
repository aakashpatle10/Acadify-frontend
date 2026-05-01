import axios from '../../lib/apiClient';

export const getAllStudents = async () => {
  const res = await axios.get('/student');
  return res.data;
};
