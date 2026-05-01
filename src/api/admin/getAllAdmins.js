import axios from '../../lib/apiClient';

export const getAllAdmins = async () => {
  const res = await axios.get('/admin');
  return res.data;
};
