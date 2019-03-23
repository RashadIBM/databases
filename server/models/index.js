var db = require('../db');

module.exports = {
  messages: {
    // a function which produces all the messages
    get: function () {
      var queryString = 'SELECT * FROM messages';
      db.connection.query(queryString, function (error, rows) {
        if (error) {
          throw error;
        }
        // console.log('******* ROWS ******* \n', rows, '******* ROWS *******\n');
        return rows;
      });
    },

    // a function which can be used to insert a message into the database
    post: function (obj) {
      var queryString = `INSERT INTO messages (userName, userMessage, roomName)
        VALUES("${obj.username}", "${obj.message}", "${obj.roomname}");`;
      db.connection.query(queryString, function (error) {
        if (error) {
          throw error;
        }
      });
    }
  },

  users: {
    get: function (obj) {
      var queryString = 'SELECT userName FROM users;';
      db.connection.query(queryString, function (error, rows) {
        if (error) {
          throw error;
        }
      });
    },
    post: function (obj) {
      var queryString = `INSERT IGNORE INTO users (userName) VALUES("${obj.username}");`;
      db.connection.query(queryString, function (error) {
        if (error) {
          throw error;
        }
      });
    }
  }
};
