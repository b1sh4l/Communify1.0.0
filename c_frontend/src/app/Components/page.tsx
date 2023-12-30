"use client";
import Image from "next/image";
import "./sidebar.css";
import Link from "next/link";
import Welcome from "../welcome/page";
import { useState } from "react";
import Server from "../server/page";
import MessageHistory from "../Messages/page";
import UserProfile from "../UserProfile/page";
import GroupChat from "../GroupChat/page";

const Sidebar: React.FC = () => {
  const [showMessages, setShowMessages] = useState(false);
  const [showServer, setShowServer] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [activeColumn, setActiveColumn] = useState<string | null>(null);

  const handleServerClick = () => {
    setShowServer((prevShowServer) => !prevShowServer);
  };

  const handleMessagesClick = () => {
    setShowMessages(!showMessages);
    console.log("showMessages:", showMessages);
  };

  const handleUserProfileClick = () => {
    setShowUserProfile(!showUserProfile);
  };

  const handleGroupChatClick = () => {
    setActiveColumn("groupchat");
  };

  const handleColumnClick = (columnName: string) => {
    setActiveColumn((prevActiveColumn) =>
      prevActiveColumn === columnName ? null : columnName
    );
  };

  return (
    <>
      <div className="container">
        <div className="sidebar">
          <div className="logo-container">
            <Image
              src="/communify.svg"
              alt="communify"
              className="sidebar-logo"
              width="73"
              height="73"
            />
            <h4 className="communify-text">Communify</h4>
          </div>
          <br />
          <br />
          <input type="text" placeholder="Search" className="sidebar-search" />
          <div className="sidebar-menu">
            <div
              className={`messages-container ${
                activeColumn === "messages" ? "active" : ""
              }`}
              onClick={() => handleColumnClick("messages")}
            >
              <Image
                src="/messages.svg"
                alt="messages"
                className="messages-logo"
                width="43"
                height="43"
              />
              <label className="messages">Messages</label>
            </div>

            <div
              className={`groupchat-container ${
                activeColumn === "groupchat" ? "active" : ""
              }`}
              onClick={() => handleColumnClick("groupchat")}
            >
              <Image
                src="/groupchat.svg"
                alt="groupchat"
                className="groupchat-logo"
                width="43"
                height="43"
              />
              <label className="groupchat">Group Chat</label>
            </div>

            <div
              className={`servers-container ${
                activeColumn === "servers" ? "active" : ""
              } ${showServer ? "withServerContainer" : ""}`}
              onClick={() => handleColumnClick("servers")}
            >
              <Image
                src="/cahnnels.svg"
                alt="servers"
                className="servers-logo"
                width="43"
                height="43"
              />
              <label className="servers">Servers</label>
            </div>

            <div className="notifications-container">
              <Image
                src="/notifications.svg"
                alt="notifications"
                className="notifications-logo"
                width="43"
                height="43"
              />
              <label className="notifications">Notifications</label>
            </div>
            <div className="friends-container">
              <Image
                src="/friends.svg"
                alt="friends"
                className="friends-logo"
                width="43"
                height="43"
              />
              <label className="friends">Friends</label>
            </div>
            <div
              className={`profile-container ${
                activeColumn === "profile" ? "active" : ""
              }`}
              onClick={() => handleColumnClick("profile")}
            >
              <Image
                src="/profile.svg"
                alt="profile"
                className="profile-logo"
                width="43"
                height="43"
              />
              <label className="profile">Profile</label>
            </div>
            <div className="settings-container">
              <Image
                src="/settings.svg"
                alt="settings"
                className="settings-logo"
                width="43"
                height="43"
              />
              <label className="settings">Settings</label>
            </div>
          </div>

          <Link className="signout" href="/welcome">
            SignOut
          </Link>
        </div>

        <div className="result-container" style={{ backgroundColor: activeColumn ? 'white' : 'transparent' }}>
          <div
            className={`messages-column ${
              activeColumn === "messages" ? "withMessagesColumn" : ""
            }`}
          >
            {activeColumn === "messages" && <MessageHistory />}
          </div>

          <div
            className={`userProfile-column ${
              activeColumn === "profile" ? "withUserProfileColumn" : ""
            }`}
          >
            {activeColumn === "profile" && <UserProfile />}
          </div>

          <div
            className={`server-column ${
              activeColumn === "servers" ? "withServerColumn" : ""
            }`}
          >
            {activeColumn === "servers" && <Server />}
          </div>

          <div
            className={`groupchat-column ${
              activeColumn === "groupchat" ? "withGroupChatColumn" : ""
            }`}
          >
            {activeColumn === "groupchat" && <GroupChat />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
