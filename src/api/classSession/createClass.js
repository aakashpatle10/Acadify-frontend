import axios from '../../lib/apiClient';

export const createClass = async (data) => {
  const res = await axios.post('/class-session', data);
  return res.data;
};
