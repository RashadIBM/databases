var db = require('../db');

module.exports = {
  messages: {
    // a function which produces all the messages
    get: function (cb) {
      var queryString = 'SELECT * FROM messages';
      db.connection.query(queryString, function (error, rows) {
        if (error) {
          cb(error);
        } else {
          cb(null, rows);
        }
        // console.log('******* ROWS ******* \n', rows, '******* ROWS *******\n');
      });
    },

    // a function which can be used to insert a message into the database
    post: function (obj, cb) {
      var queryString = `INSERT INTO messages (userName, userMessage, roomName)
        VALUES("${obj.username}", "${obj.text}", "${obj.roomname}");`;
      db.connection.query(queryString, function (error) {
        if (error) {
          cb(error);
        } else {
          cb(null, obj);
        }
      });
    }
  },

  users: {
    get: function (cb) {
      var queryString = 'SELECT userName FROM users;';
      db.connection.query(queryString, function (error, rows) {
        if (error) {
          throw error;
        } else {
          cb(null, rows);
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
