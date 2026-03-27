import React from 'react';
import { FaUser, FaRobot } from 'react-icons/fa';

export const ChatMessage = ({ msg }) => {
  const isBot = msg.sender === 'bot';

  return (
    <div className={`flex w-full mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[85%] ${isBot ? 'flex-row' : 'flex-row-reverse'} items-end gap-2`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-sm ${isBot ? 'bg-blue-500' : 'bg-green-500'}`}>
          {isBot ? <FaRobot className="w-4 h-4" /> : <FaUser className="w-4 h-4" />}
        </div>
        
        {/* Message Bubble */}
        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isBot 
            ? 'bg-white border border-gray-100 text-gray-800 rounded-bl-none shadow-sm' 
            : 'bg-blue-600 text-white rounded-br-none shadow-sm'
        }`}>
          {msg.text.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i !== msg.text.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
