DROP DATABASE IF EXISTS chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE messages(
  MessagesID INT NOT NULL auto_increment,
  userName VARCHAR(16) NOT NULL,
  userMessage VARCHAR(255) NOT NULL,
  roomName VARCHAR(20),
  PRIMARY KEY (MessagesID)
);


CREATE TABLE users(
  UserID INT NOT NULL auto_increment,
  UserName VARCHAR(16) NOT NULL,
  PRIMARY KEY (UserID),
  UNIQUE KEY(userName)
);

-- /*  Execute this file from the command line by typing:
--  *    mysql -u root < server/schema.sql
--  *  to create the database and the tables.*/

