var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get((err, obj) =>{
        if (err) {
          throw err;
        } else {
          res.send(obj);
        }
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body);
      res.end();
    } // a function which handles posting a message to the database
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

