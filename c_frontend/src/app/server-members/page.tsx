"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface ServerMembersProps {
  serverId: number;
}

interface MemberData {
  id: number;
  username: string;
}

const ServerMembers: React.FC<ServerMembersProps> = ({ serverId }) => {
  const [members, setMembers] = useState<MemberData[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1ZGFyc2hhbkBnbWFpbC5jb20iLCJzdWIiOjIyLCJpYXQiOjE3MDM2Nzk2NjQsImV4cCI6MTcwNDI4NDQ2NH0.Ao3d6Z-peKJc8Qhr0UoQrF02AuTqa8ci--suodBWkOI";
        const response = await axios.get<MemberData[]>(
          `http://localhost:3000/server/${serverId}/members`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        console.log("Members data:", response.data);

      
        setMembers((prevMembers) => [...prevMembers, ...response.data]);
      } catch (error) {
        console.error("Error fetching server members:", error as Error);
      }
    };

   
    fetchMembers();
  }, [serverId]);

  return (
    <div className="server-members">
      <h2>Server Members</h2>
      <ul>
        {members.map((member) => (
          <li key={member.id}>{member.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default ServerMembers;
