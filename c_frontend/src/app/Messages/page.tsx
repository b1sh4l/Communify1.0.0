"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatInput from "./chatInput";
import "./messageHistory.css";

interface Message {
  id: number;
  messageContent: string;
  senderId: number;
  receiverId: number;
  senderName: string;
  receiverName: string;
  timestamp: string;
  messageType: "sent" | "received";
}

const MessageHistory: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [senderId, setSenderId] = useState(21);
  const [receiverId, setReceiverId] = useState(22);
  const [newMessage, setNewMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const sendMessage = async () => {
    try {
      setLoading(true);

      const jwtToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1ZGFyc2hhbkBnbWFpbC5jb20iLCJzdWIiOjIyLCJpYXQiOjE3MDM2Nzk2NjQsImV4cCI6MTcwNDI4NDQ2NH0.Ao3d6Z-peKJc8Qhr0UoQrF02AuTqa8ci--suodBWkOI";

      const response = await axios.post(
        "http://localhost:3000/directmessage",
        {
          senderId,
          receiverId,
          messageContent: newMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      
      setMessages(response.data);


      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
     
    } finally {
      setLoading(false);
    }
  };

 
  const fetchMessagesBySender = async () => {
    try {
      setLoading(true);

      const jwtToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1ZGFyc2hhbkBnbWFpbC5jb20iLCJzdWIiOjIyLCJpYXQiOjE3MDM2Nzk2NjQsImV4cCI6MTcwNDI4NDQ2NH0.Ao3d6Z-peKJc8Qhr0UoQrF02AuTqa8ci--suodBWkOI";

      const response = await axios.get(
        `http://localhost:3000/directmessage/messages/sender/${senderId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          params: {
            page: currentPage,
            pageSize: pageSize,
          },
        }
      );

      const formattedMessages = response.data.map((message: Message) => ({
        ...message,
        messageType: "sent",
      }));

      setMessages(formattedMessages);
    } catch (error) {
      console.error("Error fetching messages by sender:", error);
    } finally {
      setLoading(false);
    }
  };

  
  const fetchMessages = async () => {
    try {
      setLoading(true);

      const jwtToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1ZGFyc2hhbkBnbWFpbC5jb20iLCJzdWIiOjIyLCJpYXQiOjE3MDM2Nzk2NjQsImV4cCI6MTcwNDI4NDQ2NH0.Ao3d6Z-peKJc8Qhr0UoQrF02AuTqa8ci--suodBWkOI";

      const senderResponse = await axios.get(
        `http://localhost:3000/directmessage/messages/sender/${senderId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          params: {
            page: currentPage,
            pageSize: pageSize,
          },
        }
      );

      const receiverResponse = await axios.get(
        `http://localhost:3000/directmessage/messages/receiver/${receiverId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          params: {
            page: currentPage,
            pageSize: pageSize,
          },
        }
      );


      const formattedMessages = [
        ...senderResponse.data.map((message: Message) => ({
          ...message,
          messageType: "sent",
        })),
        ...receiverResponse.data.map((message: Message) => ({
          ...message,
          messageType: "received",
        })),
      ];

      setMessages(formattedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchMessages();
  }, [senderId, receiverId]);

  const deleteMessage = async (id: number) => {
    try {
      const shouldDelete = window.confirm(
        "Do you want to delete this message?"
      );
      if (shouldDelete) {
        setLoading(true);

        const jwtToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1ZGFyc2hhbkBnbWFpbC5jb20iLCJzdWIiOjIyLCJpYXQiOjE3MDM2Nzk2NjQsImV4cCI6MTcwNDI4NDQ2NH0.Ao3d6Z-peKJc8Qhr0UoQrF02AuTqa8ci--suodBWkOI";

        const response = await axios.delete(
          `http://localhost:3000/directmessage/${id}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        setMessages(response.data);
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    } finally {
      setLoading(false);
    }
  };
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false, 
  };

  return (
    <div>

      <ul className="messages">
        {Array.isArray(messages) &&
          messages.map((message) => (
            <li
              key={`${message.id}-${message.messageType}`} 
              className={
                message.messageType === "sent"
                  ? "sender-message"
                  : "receiver-message"
              }
            >
              <div className="message-content">{message.messageContent}</div>
              <div className="timestamp">
                {(() => {
                  const options: Intl.DateTimeFormatOptions = {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: true, 
                  };
                  return new Date(message.timestamp).toLocaleString(
                    "en-US",
                    options
                  );
                })()}
              </div>

              {message.messageType === "sent" ? (
                <div className="sender-label">{message.senderName} </div>
              ) : (
                <div className="receiver-label">
                  {message.receiverName}(You)
                </div>
              )}
              <button
                className="btn-delete-message"
                onClick={() => deleteMessage(message.id)}
              >
                Delete
              </button>
            </li>
          ))}
      </ul>

<div className="chat-container">
      <ChatInput
        message={newMessage}
        setMessage={setNewMessage}
        onSend={sendMessage}
      />
      </div>
    </div>
  );
};

export default MessageHistory;
