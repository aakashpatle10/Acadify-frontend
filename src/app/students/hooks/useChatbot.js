import { useMutation } from '@tanstack/react-query';
import { chatbotService } from '../services/chatbot.service';

export const useChatbot = () => {
  return useMutation({
    mutationFn: (message) => chatbotService.sendMessage(message),
  });
};
