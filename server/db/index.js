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

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING(32),
    unique: true
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()')
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()')
  }
});

const Message = db.define('message', {
  username: Sequelize.STRING(32),
  text: {
    type: Sequelize.STRING(140),
    allowNull: false
  },
  roomname: Sequelize.STRING(32),
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()')
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()')
  }
});

db.authenticate()
  .then(() => {
    console.log('\n\n\n********** **********\nConnection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports.Message = Message;
module.exports.User = User;

