import React, { useState } from 'react';
import { ChatBotButton } from './ChatBotButton';
import { ChatBotPanel } from './ChatBotPanel';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatBotButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <ChatBotPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ChatBot;
