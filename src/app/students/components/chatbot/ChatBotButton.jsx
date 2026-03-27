import React from 'react';
import { FaCommentDots, FaTimes } from 'react-icons/fa';

export const ChatBotButton = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg z-50 transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-blue-300
        ${isOpen ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/40' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/40 hover:-translate-y-1'}`}
      aria-label="Toggle Chatbot"
    >
      {isOpen ? (
        <FaTimes className="w-6 h-6 animate-in spin-in" />
      ) : (
        <FaCommentDots className="w-6 h-6 animate-in zoom-in" />
      )}
    </button>
  );
};
