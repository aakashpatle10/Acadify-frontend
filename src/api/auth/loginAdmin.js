import axios from '../../lib/apiClient';

export const loginAdmin = async (credentials) => {
  const res = await axios.post('/admin/login', credentials);
  return res.data;
};
