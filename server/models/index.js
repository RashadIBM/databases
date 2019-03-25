var db = require('../db');

module.exports = {
  messages: {
    get: (cb) => {
      db.Messages.sync()
        .then(() => {
          return db.Messages.findAll();
        })
        .then((data) => {
          let allData = data.map((row) => {
            return row.dataValues;
          });
          cb(null, allData);
        })
        .catch((err) => {
          cb(err);
          db.Messages.close();
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

    post: (msg, cb) => {
      db.Message.sync()
        .then(() => {
          return db.Message.create({
            username: `${msg.username}`,
            text: `${msg.text}`,
            roomname: `${msg.roomname}`
          });
        })
        .then((aMsg) => {
          cb(null, aMsg);
        })
        .catch((err) => {
          cb(err);
          db.Messages.close();
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
    get: (cb) => {
      db.User.sync()
        .then(() => {
          return db.User.findAll();
        })
        .then((data) => {
          let allMsgs = data.map((row) => {
            return row.dataValues;
          });
          cb(null, allMsgs);
        });
      // var queryString = 'SELECT userName FROM users;';
      // db.connection.query(queryString, function (error, rows) {
      //   if (error) {
      //     throw error;
      //   } else {
      //     cb(null, rows);
      //   }
      // });
    },
    post: function (obj, cb) {
      db.User.sync()
        .then(() => {
          // Now instantiate an object and save it:
          return db.User.create({
            username: `${obj}`
          });
        })
        .then((newUser => {
          cb(null, newUser);
        }));
      // .catch(function (err) {
      // db.User.close();
      // });
      // var queryString = `INSERT IGNORE INTO users (userName) VALUES("${obj.username}");`;
      // db.connection.query(queryString, function (error) {
      //   if (error) {
      //     throw error;
      //   }
      // });
    }
  }
};