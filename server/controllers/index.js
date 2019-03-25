var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get((err, results) =>{
        if (err) {
          res.send(err);
        } else {
          res.send({results});
        }
      });
    },

    post: function (req, res) {
      models.messages.post(req.body, (err, obj) => {
        if (err) {
          res.send(err);
        } else {
          res.send(obj);
        }
      });
    }
  },

  users: {
    get: function (req, res) {
      models.users.get((err, obj) =>{
        if (err) {
          res.send(err);
        } else {
          res.send(obj);
        }
      });
    },
    post: function (req, res) {
      models.users.post(req.body.username, (err, obj) => {
        if (err) {
          res.send(err);
        } else {
          res.send(obj);
        }
      });
    }
  }
};

