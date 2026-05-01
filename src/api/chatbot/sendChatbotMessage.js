import axios from '../../lib/apiClient';

export const sendChatbotMessage = async (message) => {
  const res = await axios.post('/chatbot', { message });
  return res.data;
};
