import React, { useState } from "react";
import "./channel.css";

interface Message {
  text: string;
  timestamp: Date;
}

interface ChatWindowProps {
  channelName: string;
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ channelName, onClose }) => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = () => {
    const newMessage: Message = {
      text: message,
      timestamp: new Date(),
    };


    setMessages([...messages, newMessage]);

    console.log(`Sending message "${message}" to channel ${channelName}`);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents the default behavior of Enter key in a textarea (new line)
      handleSendMessage();
    }
  }

  return (
    <div className="channel-chat-window">
      <div className="header">
      <h2>{channelName}</h2>
      <button className="btn-close-chat-window" onClick={onClose}>X</button>
      </div>
      <div className="message-list">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <p><b>You - </b>{msg.text}</p>
            <span className="timestamp">{msg.timestamp.toLocaleString()}</span>
          </div>
        ))}
      </div>
      <div>
        <input
        className="input-message"
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)
          }
          onKeyDown={handleKeyDown}
        />
        <button className="btn-send" onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
