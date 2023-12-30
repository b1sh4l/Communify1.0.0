-- Member Table
CREATE TABLE Member (
    id INT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    mobileno VARCHAR(15) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255),
    member_since TIMESTAMP NOT NULL,
    role VARCHAR(50),
    is_banned BOOLEAN
);

-- DirectMessages Table
CREATE TABLE DirectMessages (
    id INT PRIMARY KEY,
    sender_id INT,
    receiver_id INT,
    message_content TEXT,
    timestamp TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES Member(id),
    FOREIGN KEY (receiver_id) REFERENCES Member(id)
);

-- FileSharing Table (Direct Messages and Group Chat)
CREATE TABLE FileSharing (
    id INT PRIMARY KEY,
    message_id INT,
    group_chat_id INT,
    file_path VARCHAR(255),
    file_type VARCHAR(50),
    FOREIGN KEY (message_id) REFERENCES DirectMessages(id),
    FOREIGN KEY (group_chat_id) REFERENCES GroupChat(id)
);

-- GroupChat Table
CREATE TABLE GroupChat (
    id INT PRIMARY KEY,
    group_name VARCHAR(255),
    group_type VARCHAR(50)
);

-- GroupMembers Table
CREATE TABLE GroupMembers (
    id INT PRIMARY KEY,
    group_id INT,
    member_id INT,
    FOREIGN KEY (group_id) REFERENCES GroupChat(id),
    FOREIGN KEY (member_id) REFERENCES Member(id)
);

-- Server Table
CREATE TABLE Server (
    id INT PRIMARY KEY,
    server_name VARCHAR(255),
    server_type VARCHAR(50)
);

-- ServerMembers Table
CREATE TABLE ServerMembers (
    id INT PRIMARY KEY,
    server_id INT,
    member_id INT,
    member_role VARCHAR(50),
    FOREIGN KEY (server_id) REFERENCES Server(id),
    FOREIGN KEY (member_id) REFERENCES Member(id) -- Changed 'User' to 'Member'
);

-- Channel Table
CREATE TABLE Channel (
    id INT PRIMARY KEY,
    channel_name VARCHAR(255),
    channel_type VARCHAR(50),
    server_id INT,
    FOREIGN KEY (server_id) REFERENCES Server(id)
);

-- ChannelMembers Table
CREATE TABLE ChannelMembers (
    id INT PRIMARY KEY,
    channel_id INT,
    member_id INT,
    FOREIGN KEY (channel_id) REFERENCES Channel(id),
    FOREIGN KEY (member_id) REFERENCES Member(id) -- Changed 'User' to 'Member'
);

-- Server_Channel Table
CREATE TABLE Server_Channel (
    id INT PRIMARY KEY,
    channel_name VARCHAR(255),
    channel_type VARCHAR(50),
    server_id INT,
    FOREIGN KEY (server_id) REFERENCES Server(id),
    UNIQUE (channel_name, server_id) -- Ensures each channel name is unique within a server
);
