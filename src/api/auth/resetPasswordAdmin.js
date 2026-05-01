import axios from '../../lib/apiClient';

export const resetPasswordAdmin = async (data) => {
  const res = await axios.put('/admin/reset-password', data);
  return res.data;
};
