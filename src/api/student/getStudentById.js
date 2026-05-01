import axios from '../../lib/apiClient';

export const getStudentById = async (id) => {
  const res = await axios.get(`/student/${id}`);
  return res.data;
};
