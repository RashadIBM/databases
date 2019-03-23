var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      // console.log(typeof req, '*****req****'); // req.body is blank
      models.messages.get();
      // console.log(res.body, '****123123123123*****');
      res.end();
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body);
      res.end();
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      // console.log(req);

    },
    post: function (req, res) {
      models.users.post(req.body);
      res.end();
    }
  }
};

