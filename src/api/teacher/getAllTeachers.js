import axios from '../../lib/apiClient';

export const getAllTeachers = async () => {
  const res = await axios.get('/teacher');
  return res.data;
};
