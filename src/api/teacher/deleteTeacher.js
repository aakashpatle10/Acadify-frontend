import axios from '../../lib/apiClient';

export const deleteTeacher = async (id) => {
  const res = await axios.delete(`/teacher/${id}`);
  return res.data;
};
