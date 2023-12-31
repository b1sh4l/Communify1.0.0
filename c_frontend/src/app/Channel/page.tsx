import React, { useState, useEffect } from "react";
import axios from "axios";
import "./channel.css";
import ChatWindow from "./ChatWindow";

const Channel: React.FC = () => {
  const [channelList, setChannelList] = useState<any[]>([]);
  const [channelName, setChannelName] = useState<string>("");
  const [channelType, setChannelType] = useState<string>("");
  const [channelId, setChannelId] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setTimeout(() => setError(""), 3000);
  };

  const handleCreateChannel = async () => {
    try {
        if (!channelName || !channelType) {
            handleError("Both channel name and type are required.");
            return;
          }
      const jwtToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1ZGFyc2hhbkBnbWFpbC5jb20iLCJzdWIiOjIyLCJpYXQiOjE3MDM2Nzk2NjQsImV4cCI6MTcwNDI4NDQ2NH0.Ao3d6Z-peKJc8Qhr0UoQrF02AuTqa8ci--suodBWkOI";

      const response = await axios.post(
        "http://localhost:3000/channel/create-channel",
        {
          channel_name: channelName,
          channel_type: channelType,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setChannelList([...channelList, response.data.data]);
    } catch (error: any) {
      handleError(error.response?.data?.error);
    }
  };

  const handleFetchChannels = async () => {
    try {
      const jwtToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1ZGFyc2hhbkBnbWFpbC5jb20iLCJzdWIiOjIyLCJpYXQiOjE3MDM2Nzk2NjQsImV4cCI6MTcwNDI4NDQ2NH0.Ao3d6Z-peKJc8Qhr0UoQrF02AuTqa8ci--suodBWkOI";

      const response = await axios.get(
        "http://localhost:3000/channel/channel-list",
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setChannelList(response.data.data);
    } catch (error: any) {
      handleError(error.response?.data?.error);
    }
  };

  const handleFetchChannelById = async () => {
    try {
      const jwtToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1ZGFyc2hhbkBnbWFpbC5jb20iLCJzdWIiOjIyLCJpYXQiOjE3MDM2Nzk2NjQsImV4cCI6MTcwNDI4NDQ2NH0.Ao3d6Z-peKJc8Qhr0UoQrF02AuTqa8ci--suodBWkOI";

      const response = await axios.get(
        `http://localhost:3000/channel/channel/${channelId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setChannelList([response.data.data]);
    } catch (error: any) {
      handleError(error.response?.data?.error);
    }
  };

  const handleUpdateChannel = async () => {
    try {
      const jwtToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1ZGFyc2hhbkBnbWFpbC5jb20iLCJzdWIiOjIyLCJpYXQiOjE3MDM2Nzk2NjQsImV4cCI6MTcwNDI4NDQ2NH0.Ao3d6Z-peKJc8Qhr0UoQrF02AuTqa8ci--suodBWkOI";

      const response = await axios.patch(
        `http://localhost:3000/channel/update-channel/${channelId}`,
        {
          channel_name: channelName,
          channel_type: channelType,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setChannelList(
        channelList.map((channel) =>
          channel.id === +channelId ? response.data.data : channel
        )
      );
    } catch (error: any) {
      handleError(error.response?.data?.error);
    }
  };

  const handleDeleteChannel = async () => {
    try {
      const jwtToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1ZGFyc2hhbkBnbWFpbC5jb20iLCJzdWIiOjIyLCJpYXQiOjE3MDM2Nzk2NjQsImV4cCI6MTcwNDI4NDQ2NH0.Ao3d6Z-peKJc8Qhr0UoQrF02AuTqa8ci--suodBWkOI";

      await axios.delete(`http://localhost:3000/channel/delete/${channelId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setChannelList(
        channelList.filter((channel) => channel.id !== +channelId)
      );
    } catch (error: any) {
      handleError(error.response?.data?.error);
    }
  };

  const handleOpenChat = (channelName: string) => {
    setSelectedChannel(channelName);
  };

  const handleCloseChat = () => {
    setSelectedChannel(null);
  };

  useEffect(() => {
    handleFetchChannels();
  }, []);

  return (
    <div>
      <div>
        <h2>Create Channel</h2>
        <input
          className="input-channel-name"
          type="text"
          placeholder="Channel Name"
          onChange={(e) => setChannelName(e.target.value)}
        />
        <input
          className="input-channel-type"
          type="text"
          placeholder="Channel Type"
          onChange={(e) => setChannelType(e.target.value)}
        />
        <button className="btn-create-channel" onClick={handleCreateChannel}>
          Create
        </button>
      </div>

      <div>
        <h2>Search Channel by ID</h2>
        <input
          className="input-channel-id"
          type="text"
          placeholder="Channel ID"
          onChange={(e) => setChannelId(e.target.value)}
        />
        <button className="btn-search-channel" onClick={handleFetchChannelById}>
          Search
        </button>
      </div>

      <div>
        <h2>Channel List</h2>
        <table>
          <thead>
            <tr>
              <th>Channel ID</th>
              <th>Channel Name</th>
              <th>Channel Type</th>
            </tr>
          </thead>
          <tbody>
            {channelList.map((channel) => (
              <tr
                key={channel.id}
                className="channel-row"
                onClick={() => handleOpenChat(channel.channel_name)}
              >
                <td>{channel.id}</td>
                <td>{channel.channel_name}</td>
                <td>{channel.channel_type}</td>
              </tr>
            ))}
            <tr></tr>
            <tr>
              <td></td>
              <td>
                <button
                  className="btn-refresh-channel"
                  onClick={handleFetchChannels}
                >
                  Refresh
                </button>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      {selectedChannel && (
        <ChatWindow channelName={selectedChannel} onClose={handleCloseChat} />
      )}

      <div>
        <h2>Update Channel</h2>
        <input
          className="input-channel-id"
          type="text"
          placeholder="Channel ID"
          onChange={(e) => setChannelId(e.target.value)}
        />
        <input
          className="input-channel-name"
          type="text"
          placeholder="Channel Name"
          onChange={(e) => setChannelName(e.target.value)}
        />
        <input
          className="input-channel-type"
          type="text"
          placeholder="Channel Type"
          onChange={(e) => setChannelType(e.target.value)}
        />
        <button className="btn-update-channel" onClick={handleUpdateChannel}>
          Update
        </button>
      </div>

      <div>
        <h2>Delete</h2>
        <input
          className="input-channel-id"
          type="text"
          placeholder="Channel ID"
          onChange={(e) => setChannelId(e.target.value)}
        />
        <button className="btn-delete-channel" onClick={handleDeleteChannel}>
          Delete
        </button>
      </div>

      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default Channel;
