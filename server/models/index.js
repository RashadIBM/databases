var db = require('../db');
const Sequelize = require('sequelize');

module.exports = {
  messages: {
    // a function which produces all the messages
    get: function (cb) {
      var Messages = db.connection.define('messages', {
        text: Sequelize.STRING,
        roomname: Sequelize.STRING,
        username: Sequelize.STRING,
        objectId: Sequelize.INTEGER,
        createdAt: Sequelize.date
      });
      Messages.sync()
        .then(function () {
          return cb(Messages.findAll());
        })
        .catch(function (err) {
          // Handle any error in the chain
          console.error(err);
          db.connection.close();
        });

      // var queryString = 'SELECT * FROM messages';
      // db.connection.query(queryString, function (error, rows) {
      //   if (error) {
      //     cb(error);
      //   } else {
      //     cb(null, rows);
      //   }
      // });
    },

    // a function which can be used to insert a message into the database
    post: function (obj, cb) {
      var Message = db.connection.define('message', {
        userName: Sequelize.STRING,
        userMessage: Sequelize.STRING,
        roomName: Sequelize.STRING
      });
      console.log(obj, '**********099090909009***********************');
      Message.sync()
        .then(function () {
          // Now instantiate an object and save it:
          return cb(null, Message.create({ userName: `"${obj.username}"`, userMessage: `"${obj.text}"`, roomName: `"${obj.roomname}"` }));
        })
        .catch(function (err) {
          // Handle any error in the chain
          console.error(err);
          cb(err);
          db.connection.close();
        });
      // var queryString = `INSERT INTO messages (userName, userMessage, roomName)
      //   VALUES("${obj.username}", "${obj.text}", "${obj.roomname}");`;
      // db.connection.query(queryString, function (error) {
      //   if (error) {
      //     cb(error);
      //   } else {
      //     cb(null, obj);
      //   }
      // });
    }
  },

  users: {
    get: function (cb) {
      //did not sequelize
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
      var User = db.connection.define('User', {
        username: Sequelize.STRING
      });
      User.sync()
        .then(function () {
          // Now instantiate an object and save it:
          return User.create({ username: `"${obj.username}"` });
        })
        .catch(function (err) {
          console.error(err);
          db.connection.close();
        });
      // var queryString = `INSERT IGNORE INTO users (userName) VALUES("${obj.username}");`;
      // db.connection.query(queryString, function (error) {
      //   if (error) {
      //     throw error;
      //   }
      // });
    }
  }
};