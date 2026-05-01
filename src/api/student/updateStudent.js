import axios from '../../lib/apiClient';

export const updateStudent = async (id, data) => {
  const res = await axios.put(`/student/${id}`, data);
  return res.data;
};
