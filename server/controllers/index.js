var models = require('../models');

module.exports = {
  messages: {

    // a function which handles a get request for all messages
    get: function (req, res) {
      models.messages.get((err, obj) =>{
        // console.log(obj, 'CONTROLLER OBJECT ******218517398429852953958356923865932')
        if (err) {
          res.send(err);
        } else {
          var results = obj.map((val) =>{
            console.log(val, 'asyd9asydasydasudausfaufaiugfiasugfaisugfiasugfsagufiaugsfausgfasgfilusagflasugfliausgflisaugf');
            return {
              text: val.userMessage,
              roomname: val.roomName,
              username: val.userName,
              objectId: val.MessagesID,
              createdAt: val.createdAt
            };
          });
          res.send({results});
        }
      });
    },

    // a function which handles posting a message to the database
    post: function (req, res) {
      models.messages.post(req.body, (err, obj) => {
        if (err) {
          res.send(err);
        } else {
          res.send(obj.Instance);
        }
      });
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get((err, obj) =>{
        if (err) {
          throw err;
        } else {
          res.send(obj);
        }
      });
    },
    post: function (req, res) {
      models.users.post(req.body);
      res.end();
    }
  }
};

