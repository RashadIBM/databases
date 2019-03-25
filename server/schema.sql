DROP DATABASE chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE `messages` (
  `MessagesID` INT NOT NULL auto_increment,
  `username` VARCHAR(16) NOT NULL,
  `text` VARCHAR(255) NOT NULL,
  `roomName` VARCHAR(20),
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`MessagesID`)
);

CREATE TABLE users(
  `UserID` INT NOT NULL auto_increment,
  `UserName` VARCHAR(16) NOT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY(`UserName`)
);

-- /*  Execute this file from the command line by typing:
--  *    mysql -u root - p < server/schema.sql
--  *  to create the database and the tables.*/
-- mysql -u root
-- source /server/schema.sql;
