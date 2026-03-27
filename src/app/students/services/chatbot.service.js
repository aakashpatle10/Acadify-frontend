import { chatbotAPI } from '../../../api/endpoints';

export const chatbotService = {
  sendMessage: async (message) => {
    try {
      const response = await chatbotAPI.sendMessage(message);
      return response.reply;
    } catch (error) {
      console.error('Chatbot API Error:', error);
      throw error;
    }
  }
};
