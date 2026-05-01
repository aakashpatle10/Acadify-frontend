import axios from '../../lib/apiClient';

export const getTeacherById = async (id) => {
  const res = await axios.get(`/teacher/${id}`);
  return res.data;
};
