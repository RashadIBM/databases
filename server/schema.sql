DROP DATABASE IF EXISTS chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE messages(
  MessagesID INT not null AUTO_INCREMENT,
  userName VARCHAR(16) NOT NULL,
  userMessage VARCHAR(255) NOT NULL,
  roomName VARCHAR(20),
  primary key (MessagesID)
);

-- DESCRIBE messages;
CREATE TABLE users(
  UserID INT not null AUTO_INCREMENT,
  UserName VARCHAR(16) NOT NULL,
  primary key (UserID)
);

-- /*  Execute this file from the command line by typing:
--  *    mysql -u root < server/schema.sql
--  *  to create the database and the tables.*/

