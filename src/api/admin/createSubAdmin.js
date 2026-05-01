import axios from '../../lib/apiClient';

export const createSubAdmin = async (data) => {
  const res = await axios.post('/admin', data);
  return res.data;
};
