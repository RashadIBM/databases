DROP DATABASE IF EXISTS chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE messages(
  MessagesID INT not null,
  userMessage VARCHAR(255) NOT NULL,
  roomname VARCHAR(20),
  primary key (MessagesID)
);

-- DESCRIBE messages;
CREATE TABLE users(
  UserID INT not null,
  UserName VARCHAR(16) NOT NULL,
  FavoriteLobby VARCHAR(20),
  primary key (UserID)
);

-- /*  Execute this file from the command line by typing:
--  *    mysql -u root < server/schema.sql
--  *  to create the database and the tables.*/

