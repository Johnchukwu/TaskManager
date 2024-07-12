// src/components/Chat/Chat.jsx
import { useState } from 'react';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    setMessages([...messages, message]);
    setMessage('');
  };

  return (
    <div>
      <h2>Chat</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">{msg}</div>
        ))}
      </div>
      <input 
        type="text" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        placeholder="Type a message" 
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chat;
