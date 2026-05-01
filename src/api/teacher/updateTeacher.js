import axios from '../../lib/apiClient';

export const updateTeacher = async (id, data) => {
  const res = await axios.put(`/teacher/${id}`, data);
  return res.data;
};
