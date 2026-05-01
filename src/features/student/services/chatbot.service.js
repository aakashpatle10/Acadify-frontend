import { sendChatbotMessage } from '../../../api';

export const chatbotService = {
  sendMessage: async (message) => {
    try {
      const response = await sendChatbotMessage(message);
      return response.reply;
    } catch (error) {
      console.error('Chatbot API Error:', error);
      throw error;
    }
  }
};
