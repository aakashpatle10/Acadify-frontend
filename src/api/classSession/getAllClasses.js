import axios from '../../lib/apiClient';

export const getAllClasses = async () => {
  const res = await axios.get('/class-session');
  return res.data;
};
