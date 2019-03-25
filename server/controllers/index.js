var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get((err, obj) =>{
        if (err) {
          res.send(err);
        } else {
          // var results = obj.map((val) =>{
          //   return {
          //     text: val.userMessage,
          //     roomname: val.roomName,
          //     username: val.userName,
          //     objectId: val.MessagesID,
          //     createdAt: val.createdAt

          //   };
          // });
          // res.send({results});
          res.json(obj);
        }
      });
    },

    post: function (req, res) {
      models.messages.post(req.body, (err, obj) => {
        if (err) {
          res.send(err);
        } else {
          // res.send(obj.Instance);
          res.json(obj);
        }
      });
    }
  },

  users: {
    get: function (req, res) {
      models.users.get((err, obj) =>{
        if (err) {
          throw err;
        } else {
          // res.send(obj);
          res.json(obj);
        }
      });
    },
    post: function (req, res) {
      models.users.post(req.body.username, (err, obj) => {
        if (err) {
          console.log(err);
        } else {
          res.json(obj);
        }
      });
      // res.end();
    }
  }
};

