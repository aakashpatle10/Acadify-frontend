import axios from '../../lib/apiClient';

export const deleteStudent = async (id) => {
  const res = await axios.delete(`/student/${id}`);
  return res.data;
};
