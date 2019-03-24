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
    timestamps: false
  }
});
module.exports.connection = db;
