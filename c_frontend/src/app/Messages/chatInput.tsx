"use client";   
import React, { useState } from "react";
import "./chatInput.css";

interface ChatInputProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  onSend: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ message, setMessage, onSend }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendClick = () => {
    onSend();
  };

  return (
    <div>
      <input
        className="chat-input"
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={handleInputChange}
      />
      <button className="btn-submit-chat-input" onClick={handleSendClick}>Send</button>
    </div>
  );
};

export default ChatInput;