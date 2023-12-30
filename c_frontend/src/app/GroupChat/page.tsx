import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./GroupChat.css";

interface Group {
  id: number;
  groupName: string;
  groupType: string;
}

interface Message {
  id: number;
  groupId: number;
  content: string;
  sender: string;
  timestamp: number;
}

const GroupChat: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [messages, setMessages] = useState<Record<number, Message[]>>({});
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupType, setNewGroupType] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
   
    socketRef.current = new WebSocket("ws://localhost:3000"); 

    // Fetch groups when the component mounts
    fetchGroups();

    return () => {
      // Disconnect from the WebSocket server when the component unmounts
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    // Subscribe to group updates when a group is selected
    if (selectedGroup) {
      socketRef.current?.send(
        JSON.stringify({ type: "join", groupId: selectedGroup.id })
      );
    }
  }, [selectedGroup]);

  useEffect(() => {
    // Handle incoming WebSocket messages
    const handleMessage = (event: MessageEvent) => {
      const messageData: Message = JSON.parse(event.data);
      // Check if the message is for the selected group
      if (selectedGroup && messageData.id === selectedGroup.id) {
        setMessages((prevMessages) => {
          const updatedMessages = { ...prevMessages };
          updatedMessages[selectedGroup.id] = [
            ...(prevMessages[selectedGroup.id] || []),
            { ...messageData, timestamp: Date.now() },
          ];
          return updatedMessages;
        });
      }
    };

    if (socketRef.current) {
      socketRef.current.addEventListener("message", handleMessage);
    }

    return () => {
      // Remove the event listener when the component unmounts
      if (socketRef.current) {
        socketRef.current.removeEventListener("message", handleMessage);
      }
    };
  }, [selectedGroup]);

  const fetchGroups = async () => {
    // Fetch groups from the server
    const jwtToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1ZGFyc2hhbkBnbWFpbC5jb20iLCJzdWIiOjIyLCJpYXQiOjE3MDM2Nzk2NjQsImV4cCI6MTcwNDI4NDQ2NH0.Ao3d6Z-peKJc8Qhr0UoQrF02AuTqa8ci--suodBWkOI";

    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/groupchat/groups",
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setGroups(response.data.groups);
    } catch (error) {
      console.error("Error fetching groups:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGroupClick = (group: Group) => {
    setSelectedGroup(group);
  };

  const handleSendMessage = () => {
    if (selectedGroup && newMessage.trim() !== "" && socketRef.current) {
      const messageData: Message = {
        id: selectedGroup.id,
        groupId: selectedGroup.id,
        content: newMessage,
        sender: "You",
        timestamp: 0,
      };

 
      socketRef.current.send(JSON.stringify({ type: "message", messageData }));


      setMessages((prevMessages) => {
        const updatedMessages = { ...prevMessages };
        updatedMessages[selectedGroup.id] = [
          ...(prevMessages[selectedGroup.id] || []),
          { ...messageData, timestamp: Date.now() },
        ];
        return updatedMessages;
      });

      setNewMessage("");
    }
  };

  const handleCreateGroup = async () => {

    if (newGroupName.trim() === "" || newGroupType.trim() === "") {
      alert("Please enter both group name and group type.");
      return;
    }

    try {
      const jwtToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1ZGFyc2hhbkBnbWFpbC5jb20iLCJzdWIiOjIyLCJpYXQiOjE3MDM2Nzk2NjQsImV4cCI6MTcwNDI4NDQ2NH0.Ao3d6Z-peKJc8Qhr0UoQrF02AuTqa8ci--suodBWkOI";

      const response = await axios.post(
        "http://localhost:3000/groupchat/create-group",
        {
          groupName: newGroupName,
          groupType: newGroupType,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      const newGroup: Group = response.data.group;
      setGroups((prevGroups) => [...prevGroups, newGroup]);
      setSuccessMessage("Group created successfully!");
    } catch (error) {
      console.error("Error creating group:", error);
      setSuccessMessage(null); 
    } finally {
 
      setNewGroupName("");
      setNewGroupType("");
      setIsCreatingGroup(false);
    }
  };

  const handleUpdateGroup = async () => {
    
    if (
      selectedGroup &&
      newGroupName.trim() !== "" &&
      newGroupType.trim() !== ""
    ) {
      try {
        const jwtToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1ZGFyc2hhbkBnbWFpbC5jb20iLCJzdWIiOjIyLCJpYXQiOjE3MDM2Nzk2NjQsImV4cCI6MTcwNDI4NDQ2NH0.Ao3d6Z-peKJc8Qhr0UoQrF02AuTqa8ci--suodBWkOI";

        const response = await axios.patch(
          `http://localhost:3000/groupchat/update-group/${selectedGroup.id}`,
          {
            groupName: newGroupName,
            groupType: newGroupType,
          },
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        const updatedGroup: Group = response.data.group;
        setGroups((prevGroups) =>
          prevGroups.map((group) =>
            group.id === updatedGroup.id ? updatedGroup : group
          )
        );
        setSuccessMessage("Group updated successfully!");
      } catch (error) {
        console.error("Error updating group:", error);
        setSuccessMessage(null); 
      } finally {
        
        setNewGroupName("");
        setNewGroupType("");
        setSelectedGroup(null);
      }
    }
  };

  const handleDeleteGroup = async (groupId: number) => {
    try {
      const shouldDelete = window.confirm(
        "Are you sure you want to delete this group?"
      );

      if (shouldDelete) {
        const jwtToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1ZGFyc2hhbkBnbWFpbC5jb20iLCJzdWIiOjIyLCJpYXQiOjE3MDM2Nzk2NjQsImV4cCI6MTcwNDI4NDQ2NH0.Ao3d6Z-peKJc8Qhr0UoQrF02AuTqa8ci--suodBWkOI";

        await axios.delete(`http://localhost:3000/groupchat/delete/${groupId}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        setGroups((prevGroups) =>
          prevGroups.filter((group) => group.id !== groupId)
        );

       
        setSelectedGroup(null);
        setMessages({});
        setSuccessMessage("Group deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting group:", error);
      setSuccessMessage(null); 
    }
  };

  return (
    <div>
      <h1 className="heading-groupchat">Group Chat</h1>
      <div className="group-chat-container">
        {loading && <p>Loading...</p>}

        <div className="group-list" style={{ display: "flex" }}>
          {/* Group List */}
          <div className="group-list" style={{ flex: 1, marginRight: "20px" }}>
            <h2>Groups</h2>
            <ul>
              {groups.map((group) => (
                <li
                  key={group.id}
                  onClick={() => handleGroupClick(group)}
                  style={{ cursor: "pointer" }}
                  className={
                    selectedGroup?.id === group.id ? "active-group" : ""
                  }
                >
                  {group.groupName}
                  <button
                    className="delete-group-button"
                    onClick={() => handleDeleteGroup(group.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            {isCreatingGroup ? (
              <div className="create-update-group-container">
                <input
                  type="text"
                  placeholder="Group Name"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Group Type"
                  value={newGroupType}
                  onChange={(e) => setNewGroupType(e.target.value)}
                />
                <button
                  className="create-update-group-button"
                  onClick={handleCreateGroup}
                >
                  Create
                </button>
                <button
                  className="create-update-group-button"
                  onClick={() => setIsCreatingGroup(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="create-update-group-button"
                onClick={() => setIsCreatingGroup(true)}
              >
                Create Group
              </button>
            )}
          </div>

          {/* Chat Window */}
          <div className="chat-window" style={{ flex: 3 }}>
            <h2>
              {selectedGroup
                ? `Chat - ${selectedGroup.groupName}`
                : "Select a group to start chatting"}
            </h2>
            <div
              className="chat-messages"
              style={{
                height: "300px",
                overflowY: "scroll",
                marginBottom: "10px",
              }}
            >
              {selectedGroup &&
                messages[selectedGroup.id]?.map((message) => (
                  <div key={message.id} className="chat-message">
                    <p>
                      <strong className="message-sender">
                        {message.sender}:
                      </strong>{" "}
                      <span className="message-content">{message.content}</span>{" "}
                      -{" "}
                      <span className="message-timestamp">
                        {new Date(message.timestamp).toLocaleString()}
                      </span>
                    </p>
                  </div>
                ))}
            </div>
            {selectedGroup && (
              <div>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="message-input"
                />
                <button className="send-button" onClick={handleSendMessage}>
                  Send
                </button>
                <br />
                <input
                  type="text"
                  placeholder="New Group Name"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="New Group Type"
                  value={newGroupType}
                  onChange={(e) => setNewGroupType(e.target.value)}
                />
                <button
                  className="create-update-group-button"
                  onClick={handleUpdateGroup}
                >
                  Update Group
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {successMessage && (
        <div style={{ color: "green", marginTop: "10px" }}>{successMessage}</div>
      )}
    </div>
  );
};

export default GroupChat;
