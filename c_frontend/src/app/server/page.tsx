"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import "./server.css";
import ServerMembers from "../server-members/page";
import Channel from "../Channel/page";

interface ServerProps {}

interface ServerData {
  id: number;
  serverName: string;
  serverType: string;
}

const Server: React.FC<ServerProps> = () => {
  const [showForm, setShowForm] = useState(false);
  const [serverName, setServerName] = useState("");
  const [serverType, setserverType] = useState("");
  const [serverList, setServerList] = useState<ServerData[]>([]);
  const [selectedServer, setSelectedServer] = useState<ServerData | null>(null);
  const [isServerSelected, setIsServerSelected] = useState(false);
  

  const fetchServerList = async () => {
    try {
      const jwtToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1ZGFyc2hhbkBnbWFpbC5jb20iLCJzdWIiOjIyLCJpYXQiOjE3MDM2Nzk2NjQsImV4cCI6MTcwNDI4NDQ2NH0.Ao3d6Z-peKJc8Qhr0UoQrF02AuTqa8ci--suodBWkOI";
      const response = await axios.get<ServerData[]>(
        "http://localhost:3000/server",
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setServerList(response.data);
    } catch (error) {
      console.error("Error fetching server list:", error as Error);
    }
  };

  useEffect(() => {
   
    fetchServerList();
  }, []);

  const handleCreateServer = () => {
    setShowForm(true);
  };

  const handleSubmit = async () => {
    try {
      if (!serverName) {
        throw new Error("Server name is required.");
      }
      console.log("Submitting with serverName:", serverName);
      console.log("Submitting with serverType:", serverType);
      const jwtToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1ZGFyc2hhbkBnbWFpbC5jb20iLCJzdWIiOjIyLCJpYXQiOjE3MDM2Nzk2NjQsImV4cCI6MTcwNDI4NDQ2NH0.Ao3d6Z-peKJc8Qhr0UoQrF02AuTqa8ci--suodBWkOI";

      const response = await axios.post(
        "http://localhost:3000/server/create-server",
        {
          serverName,
          serverType,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      console.log("Server created:", response.data);
      setServerName("");
      setserverType("");
      setShowForm(false);
      fetchServerList();
    } catch (error) {
      console.error("Error creating server:", error as Error);
    }
  };

  const handleInviteMember = async (serverId: number) => {
    try {
      const memberId = prompt("Enter the member ID to invite:");
      if (!memberId) {
        throw new Error("Member ID is required.");
      }

      const jwtToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1ZGFyc2hhbkBnbWFpbC5jb20iLCJzdWIiOjIyLCJpYXQiOjE3MDM2Nzk2NjQsImV4cCI6MTcwNDI4NDQ2NH0.Ao3d6Z-peKJc8Qhr0UoQrF02AuTqa8ci--suodBWkOI"; 

      const response = await axios.post(
        `http://localhost:3000/server/${serverId}/invite-member`,
        {
          memberId,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      console.log("Member invited:", response.data);
    } catch (error) {
      console.error("Error inviting member:", error as Error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const shouldDelete = window.confirm("Are you sure you want to delete this server?");
      if (shouldDelete) {
      const jwtToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1ZGFyc2hhbkBnbWFpbC5jb20iLCJzdWIiOjIyLCJpYXQiOjE3MDM2Nzk2NjQsImV4cCI6MTcwNDI4NDQ2NH0.Ao3d6Z-peKJc8Qhr0UoQrF02AuTqa8ci--suodBWkOI";

      await axios.delete(`http://localhost:3000/server/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      fetchServerList();
    }
    } catch (error) {
      console.error("Error deleting server:", error as Error);
    }
  };

  const handleServerClick = (server: ServerData) => {
    console.log('Server clicked:', server);
    setSelectedServer(server);
  };

  return (
    <div className="server-body">
      <h1 className="server-list">Server List</h1>
      {!showForm ? (
        <button className="btn-createserver" onClick={handleCreateServer}>
          Create Server
        </button>
      ) : (
        <div>
          <input
            type="text"
            className="input-servername"
            placeholder="Server Name"
            value={serverName}
            onChange={(e) => setServerName(e.target.value)}
          />
          <input
            type="text"
            className="input-servercategory"
            placeholder="Server Category"
            value={serverType}
            onChange={(e) => setserverType(e.target.value)}
          />
          <button className="btn-submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}
      {/* <ul>
        {serverList.map((server) => (
          <li key={server.id}>{server.serverName}</li>
        ))}
      </ul> */}
       {isServerSelected ? (
        <div className="server-details-container">
          <h2>Server Details</h2>
          <p>ID: {selectedServer?.id}</p>
          <p>Name: {selectedServer?.serverName}</p>
          <p>Type: {selectedServer?.serverType}</p>
          <h2>Channels</h2>
          <Channel/>
        </div>

      ) : (
      <ul>
        {serverList.map((server) => (
          <li key={server.id} className={`server-item ${selectedServer && selectedServer.id === server.id ? 'selected' : ''}`}
          onClick={() => {
            handleServerClick(server);
            setIsServerSelected(true);
          }}>
            {server.serverName}

            <button
              className="btn-invitemember"
              onClick={() => handleInviteMember(server.id)}
            >
              Invite Member
            </button>
            <button
              className="btn-deleteserver"
              onClick={() => handleDelete(server.id)}
            >
              Delete
            </button>
            
          </li>
        ))}
      </ul>
      )}


      {selectedServer !== null && (
        
        <div className="server-members-container">
          <ServerMembers serverId={selectedServer.id} />
        </div>
      )}
    </div>

  );
};

export default Server;
