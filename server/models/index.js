var db = require('../db');

module.exports = {
  messages: {
    // a function which produces all the messages
    get: function () {
      var queryString = 'SELECT userMessage FROM messages';
      db.query(queryString, function (error, rows) {
        if (error) {
          throw error;
        }
      });
    },

    // a function which can be used to insert a message into the database
    post: function (obj) {
      var queryString = `INSERT INTO messages (userName, userMessage, roomName)
        VALUES(${obj.username}, ${obj.message}, ${obj.roomname})`;
      db.query(queryString, function (error) {
        if (error) {
          throw error;
        }
      });
    }
  },

  users: {
    // Ditto as above.
    get: function () {
      var queryString = 'SELECT userName FROM users';
      db.query(queryString, function (error, rows) {
        if (error) {
          throw error;
        }
      });
    },
    post: function (obj) {
      var queryString = `INSERT INTO users (userName)
        VALUES(${obj.username});`;
      db.query(queryString, function (error) {
        if (error) {
          throw error;
        }
      });
    }
  }
};
