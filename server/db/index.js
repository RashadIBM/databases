// var mysql = require('mysql');

// // Create a database connection and export it from this file.
// // You will need to connect with the user "root", no password,
// // and to the database "chat".

// var connection = mysql.createConnection({
//   user: 'root',
//   password: '',
//   database: 'chat',
// });

// module.exports.connection = connection;

const Sequelize = require('sequelize');

const db = new Sequelize('chat', 'root', '', {
  define: {
    timestamps: true
  }
});
module.exports = {
  User: db.define('user', {
    id: {
      type: Sequelize.INTEGER,
      field: "id",
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING(32),
      // unique: true
    }
  }),

  Message: db.define('message', {
    username: Sequelize.STRING(32),
    text: {
      type: Sequelize.STRING(140),
      allowNull: false
    },
    roomname: Sequelize.STRING(32),
  })
};

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// User.sync({ force: true })
//   .then(() => {
//     return User.create({ username: 'Jean Valjean' });
//   })
//   .then(() => {
//     return User.findAll({ where: { username: 'Jean Valjean' } });
//   })
//   .then((user) => {
//     user.forEach(function (person) {
//       console.log(person.username + ' exists');
//     });
//     db.close();
//   })
// Message.sync({ force: true });


