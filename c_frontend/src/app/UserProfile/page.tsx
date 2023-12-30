import { useEffect, useState } from "react";
import "./userProfile.css";
import Image from "next/image";

interface User {
  id: number;
  username: string;
  email: string;
  mobileno: string;
  firstname: string;
  lastname: string;
  member_since: Date;
  role: string;
  is_banned: boolean;
}

const UserProfile: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [userIdForFetch, setUserIdForFetch] = useState<number | null>(null);
  const [showAssignRole, setShowAssignRole] = useState(false);
  const [newRole, setNewRole] = useState("");
  const [emailForFetch, setEmailForFetch] = useState<string>("");
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [fetchedUser, setFetchedUser] = useState<User | null>(null);
  const [newUserData, setNewUserData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    mobileno: "",
    password: "",
    profile_picture: "",
    member_since: new Date(),
    role: "",
    is_banned: false,
  });
  const [showFetchById, setShowFetchById] = useState(false);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showFetchByEmail, setShowFetchByEmail] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const jwtToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1ZGFyc2hhbkBnbWFpbC5jb20iLCJzdWIiOjIyLCJpYXQiOjE3MDM2Nzk2NjQsImV4cCI6MTcwNDI4NDQ2NH0.Ao3d6Z-peKJc8Qhr0UoQrF02AuTqa8ci--suodBWkOI";

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/manage-user", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const fetchUserById = async (userId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/manage-user/find/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      const data = await response.json();
      console.log("Fetched user by ID:", data);
      setFetchedUser({
        ...data,
        firstname: data.firstname,
        lastname: data.lastname,
        mobileno: data.mobileno,
        member_since: data.member_since,
        role: data.role,
        is_banned: data.is_banned,
      });
    } catch (error) {
      console.error("Error fetching user by ID", error);
    }
  };

  const createUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/manage-user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(newUserData),
      });
      setActionMessage("User created successfully!");
    } catch (error) {
      console.error("Error creating user", error);
    }
  };

  const updateUser = async (userId: number) => {
    setEditingUserId(userId);
    try {
      const response = await fetch(
        `http://localhost:3000/manage-user/update/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      const data = await response.json();
      setNewUserData(data);
    } catch (error) {
      console.error("Error fetching user for update", error);
    }
  };

  const deleteUser = async (userId: number) => {
    try {
      const jwtToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1ZGFyc2hhbkBnbWFpbC5jb20iLCJzdWIiOjIyLCJpYXQiOjE3MDM2Nzk2NjQsImV4cCI6MTcwNDI4NDQ2NH0.Ao3d6Z-peKJc8Qhr0UoQrF02AuTqa8ci--suodBWkOI";

      const shouldDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );
      console.log("Deleting user with ID:", userId);
      if (shouldDelete) {
        const response = await fetch(
          `http://localhost:3000/manage-user/delete/${userId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        setActionMessage("User deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/manage-user/update/${editingUserId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify(newUserData),
        }
      );
      // Handle success or error
      setEditingUserId(null);
      setNewUserData({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        mobileno: "",
        password: "",
        profile_picture: "",
        member_since: new Date(),
        role: "",
        is_banned: false,
      });
      setActionMessage("User updated successfully!");
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  const editUsername = async (userId: number, newUsername: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/manage-user/edit-username/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({ newUsername }),
        }
      );
      // Handle success or error
    } catch (error) {
      console.error("Error editing username", error);
    }
  };

  const removeProfilePicture = async (userId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/manage-user/remove-profile-picture/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      console.log("Removed profile picture");
      // Handle success or error
    } catch (error) {
      console.error("Error removing profile picture", error);
    }
  };

  const assignRole = async (userId: number, newRole: string) => {
    setShowAssignRole(true);
    try {
      const response = await fetch(
        `http://localhost:3000/manage-user/assign-role/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({ newRole }),
        }
      );
      setActionMessage("Role has been updated successfully!");
      // Handle success or error
    } catch (error) {
      console.error("Error assigning role", error);
    }
  };

  const banUser = async (userId: number) => {
    try {
      const shouldBan = window.confirm("Are you sure you want to ban this user?");
      if (shouldBan) {
      const response = await fetch(
        `http://localhost:3000/manage-user/ban-user/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setActionMessage("User has been banned!");
      }
    } catch (error) {
      console.error("Error banning user", error);
    }
  };

  const fetchUserByEmail = async (email: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/manage-user/${email}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      const data = await response.json();
     
      console.log("Fetched user by email:", data);
      setFetchedUser(data);
    } catch (error) {
      console.error("Error fetching user by email", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-dashboard">
      {actionMessage && (
        <div className="action-message">
          <p>{actionMessage}</p>
        </div>
      )}
      <h1>Admin Dashboard</h1>

      <div>
      <Image
                src="/createUser.svg"
                alt="createUser"
                className="createUser-icon"
                width="50"
                height="50"
                onClick={() => setShowCreateUser(!showCreateUser)}
              />
        {/* <h2
          className="create-user-heading"
          onClick={() => setShowCreateUser(!showCreateUser)}
        >Create User
        </h2> */}
        
        {showCreateUser && (
          <form>
            <div className="create-user-form input">
              <div>
                <label>Username:</label>
                <input
                  type="text"
                  value={newUserData.username}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, username: e.target.value })
                  }
                  required  
                />
              </div>
              <div>
                <label>First Name:</label>
                <input
                  type="text"
                  value={newUserData.firstname}
                  onChange={(e) =>
                    setNewUserData({
                      ...newUserData,
                      firstname: e.target.value,
                    }
                    )
                  }
                  required  
                />
              </div>
              <div>
                <label>Last Name:</label>
                <input
                  type="text"
                  value={newUserData.lastname}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, lastname: e.target.value })
                  } required  
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="text"
                  value={newUserData.email}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, email: e.target.value })
                  } required  
                />
              </div>
              <div>
                <label>Mobile Number:</label>
                <input
                  type="text"
                  value={newUserData.mobileno}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, mobileno: e.target.value })
                  } required  
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  value={newUserData.password}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, password: e.target.value })
                  } required  
                />
              </div>
             
              <button
                type="button"
                className="create-user-btn"
                onClick={() => createUser()}
              >
                Create User
              </button>
            </div>
          </form>
        )}
      </div>

      <div>
      <Image
                src="/search.svg"
                alt="Search User by ID"
                className="fetch-by-id-icon"
                width="50"
                height="50"
                onClick={() => setShowFetchById(!showFetchById)}
              />
        {/* <h2
          className="fetch-by-id-heading"
          onClick={() => setShowFetchById(!showFetchById)}
        >
          Search User by ID
        </h2> */}
        {showFetchById && (
          <div>
            <input
              className="fetch-by-user-id-input"
              type="number"
              value={userIdForFetch || ""}
              onChange={(e) => setUserIdForFetch(Number(e.target.value))}
              placeholder="Enter User ID"
              required  
            />
            <button
              className="fetch-by-id-btn"
              onClick={() =>
                userIdForFetch !== null && fetchUserById(userIdForFetch)
              }
            >
              Search
            </button>
            {fetchedUser && (
              <div>
                <h3>User Information:</h3>
                <p>ID: {fetchedUser.id}</p>
                <p>Username: {fetchedUser.username}</p>
                <p>Email: {fetchedUser.email}</p>
                <p>First Name: {fetchedUser.firstname}</p>
                <p>Last Name: {fetchedUser.lastname}</p>
                <p>Mobile No: {fetchedUser.mobileno}</p>
                <p>
                  Member Since:{" "}
                  {new Date(fetchedUser.member_since).toLocaleDateString()}
                </p>
                <p>Role: {fetchedUser.role}</p>
                <p>Is Banned: {fetchedUser.is_banned ? "Yes" : "No"}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div>
      <Image
                src="/searchbyemail.svg"
                alt="Search User by Email"
                className="fetch-by-email-icon"
                width="50"
                height="50"
                onClick={() => setShowFetchByEmail(!showFetchByEmail)}
              />
        {/* <h2
          className="fetch-by-email-heading"
          onClick={() => setShowFetchByEmail(!showFetchByEmail)}
        >
          Search User by Email
        </h2> */}
        {showFetchByEmail && (
          <div>
            <input
              className="fetch-by-email-input"
              type="text"
              value={emailForFetch}
              onChange={(e) => setEmailForFetch(e.target.value)}
              placeholder="Enter User Email"
              required  
            />
            <button
              className="fetch-by-email-btn"
              onClick={() => fetchUserByEmail(emailForFetch)}
            >
              Search
            </button>
            {fetchedUser && (
              <div>
                <h3>User Information:</h3>
                <p>ID: {fetchedUser.id}</p>
                <p>Username: {fetchedUser.username}</p>
                <p>Email: {fetchedUser.email}</p>
                <p>First Name: {fetchedUser.firstname}</p>
                <p>Last Name: {fetchedUser.lastname}</p>
                <p>Mobile No: {fetchedUser.mobileno}</p>
                <p>
                  Member Since:{" "}
                  {new Date(fetchedUser.member_since).toLocaleDateString()}
                </p>
                <p>Role: {fetchedUser.role}</p>
                <p>Is Banned: {fetchedUser.is_banned ? "Yes" : "No"}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <h2 className="users-heading">Users</h2>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span
              className="user-info"
              onClick={() => {
                setSelectedUserId(user.id === selectedUserId ? null : user.id);
              }}
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              {user.username} - {user.email}
            </span>
            {selectedUserId === user.id && (
              <div>
                <button
                  className="update-user-btn"
                  onClick={() => updateUser(user.id)}
                >
                  Update User
                </button>
                <button
                  className="delete-user-btn"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete User
                </button>
                <button
                  className="remove-profile-picture-btn"
                  onClick={() => removeProfilePicture(user.id)}
                >
                  Remove Profile Picture
                </button>
                <button
                  className="assign-role-btn"
                  onClick={() => {
                    setShowAssignRole(true);
                    setNewRole("");
                  }}
                >
                  Assign Role
                </button>

                <button
                  className="ban-user-btn"
                  onClick={() => banUser(user.id)}
                >
                  Ban User
                </button>
                {showAssignRole && (
                  <div>
                    <label>New Role:</label>
                    <input
                      type="text"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                        
                    />
                    <button
                      className="confirm-role-btn"
                      onClick={() => {
                        assignRole(user.id, newRole);
                        setShowAssignRole(false);
                        setNewRole("");
                      }}
                    >
                      Confirm
                    </button>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      {editingUserId !== null && (
        <div>
          <h2>Edit User</h2>
          <div className="update-user-form input">
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={newUserData.username}
                onChange={(e) =>
                  setNewUserData({ ...newUserData, username: e.target.value })
                }
                required  
              />
            </div>

            <div>
              <label>First Name:</label>
              <input
                type="text"
                value={newUserData.firstname}
                onChange={(e) =>
                  setNewUserData({ ...newUserData, firstname: e.target.value })
                }
                  
              />
            </div>
            <div>
              <label>Last Name:</label>
              <input
                type="text"
                value={newUserData.lastname}
                onChange={(e) =>
                  setNewUserData({ ...newUserData, lastname: e.target.value })
                }
                required  
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="text"
                value={newUserData.email}
                onChange={(e) =>
                  setNewUserData({ ...newUserData, email: e.target.value })
                }
                required  
              />
            </div>
            <div>
              <label>Mobile Number:</label>
              <input
                type="text"
                value={newUserData.mobileno}
                onChange={(e) =>
                  setNewUserData({ ...newUserData, mobileno: e.target.value })
                }
                required  
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={newUserData.password}
                onChange={(e) =>
                  setNewUserData({ ...newUserData, password: e.target.value })
                }
                required  
              />
            </div>

            <button className="update-user-btn" onClick={() => handleUpdate()}>
              Update User
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
