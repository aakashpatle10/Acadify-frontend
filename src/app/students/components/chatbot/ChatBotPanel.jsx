import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';
import { ChatMessage } from './ChatMessage';
import { useChatbot } from '../../hooks/useChatbot';

const SUGGESTED_QUESTIONS = [
  "What is my attendance?",
  "Did I miss any classes?",
  "Explain recursion simply",
  "Give me a roadmap to learn backend"
];

export const ChatBotPanel = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi there! I am your Student Assistant. How can I help you with your studies or attendance today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  
  const messagesEndRef = useRef(null);
  const { mutate: sendMessage, isPending } = useChatbot();

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isPending]);

  const handleSend = (text = inputMessage) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg = { sender: 'user', text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');

    // Call API
    sendMessage(userMsg.text, {
      onSuccess: (reply) => {
        setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
      },
      onError: (error) => {
        setMessages(prev => [...prev, { 
          sender: 'bot', 
          text: "I'm having trouble connecting right now. Please try again later." 
        }]);
      }
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div 
      className={`fixed top-0 right-0 sm:top-auto sm:bottom-24 sm:right-6 w-full h-full sm:w-[380px] sm:h-[600px] sm:max-h-[80vh] bg-gray-50 flex flex-col sm:rounded-2xl sm:shadow-2xl z-40 transition-transform duration-300 overflow-hidden border border-gray-200 ${isOpen ? 'translate-x-0' : 'translate-x-full sm:translate-x-[120%] sm:opacity-0'}`}
    >
      {/* Header */}
      <div className="bg-white px-5 py-4 flex items-center justify-between shadow-sm border-b border-gray-100 z-10 shrink-0">
        <div>
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Student Assistant
          </h2>
          <p className="text-xs text-gray-500 font-medium">Always here to help you study</p>
        </div>
        <button 
          onClick={onClose}
          className="sm:hidden p-2 text-gray-500 hover:text-gray-700 bg-gray-100 rounded-full"
        >
          <FaTimes />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-5 scroll-smooth custom-scrollbar">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} msg={msg} />
        ))}
        {isPending && (
          <div className="flex justify-start mb-4">
            <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="px-5 py-2 shrink-0">
          <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Suggested questions</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="bg-white border border-blue-100 text-blue-600 text-xs px-3 py-1.5 rounded-full hover:bg-blue-50 transition-colors shadow-sm text-left truncate max-w-full"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white p-4 shrink-0 border-t border-gray-100 flex items-center gap-2">
        <div className="flex-1 bg-gray-50 rounded-xl flex border border-gray-200 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your question..."
            maxLength={500}
            rows={1}
            className="w-full bg-transparent border-none text-sm px-4 py-3 focus:outline-none resize-none overflow-hidden h-auto max-h-32" 
            style={{ minHeight: '44px' }}
          />
        </div>
        <button
          onClick={() => handleSend()}
          disabled={!inputMessage.trim() || isPending}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white w-11 h-11 rounded-xl flex items-center justify-center transition-colors shadow-sm disabled:cursor-not-allowed shrink-0"
        >
          <FaPaperPlane className="w-4 h-4 ml-[-2px]" />
        </button>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #e5e7eb;
          border-radius: 20px;
        }
      `}} />
    </div>
  );
};
