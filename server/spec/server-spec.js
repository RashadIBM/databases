/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!
var expect = require('chai').expect;

describe('Persistent Node Chat Server', function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: 'root',
      password: '',
      database: 'chat'
    });
    dbConnection.connect();

    var tablename = 'messages'; // TODO: fill this out //this was changed
    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query('truncate users');
    dbConnection.query('truncate ' + tablename, done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', function(done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Valjean' }
    }, function () {
      // Post a message to the node chat server:
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          username: 'Valjean',
          text: 'In mercy\'s name, three days is all I need.',
          roomname: 'Hello'
        }
      }, function () {
        var queryString = 'SELECT * FROM messages'; //this was NOT changed
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function(err, results) {
          expect(results.length).to.equal(1);
          expect(results[0].text).to.equal('In mercy\'s name, three days is all I need.'); // this was changed

          done();
        });
      });
    });
  });

  it('Should output all messages from the DB', function(done) {
    // Let's insert a message into the db
    var queryString = `INSERT INTO messages (username, text, roomname)
          VALUES ("Valjean\'s Sister", 'Men like you can never change!', 'main');`; //this was changed
    var queryArgs = [];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    dbConnection.query(queryString, queryArgs, function(err) {
      if (err) {
        // console.log('\n\n***Test2 ERROR***\n', err);
        // throw err;
      }
      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
        if (error) {
          console.log(error);
          throw error;
        }
        var messageLog = JSON.parse(body);
        expect(messageLog.results[0].text).to.equal('Men like you can never change!'); //this was changed (from .text to .userMessage)
        expect(messageLog.results[0].roomname).to.equal('main');
        done();
      });
    });
  });

  it('Should not input the username more than once when input multiple times', function(done) {
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'SpongeBob' }
    }, function () {
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/users',
        json: { username: 'SpongeBob'}
      }, function () {
        var queryString = 'SELECT * FROM users'; //WHERE username="SpongeBob"';
        var queryArgs = [];
        dbConnection.query(queryString, queryArgs, function(err, results) {
          if (err) {
            console.log(err);
            done();
            throw err;
          }
          expect(results.length).to.equal(1);
          done();
        });
      });
    });
  });

  it('Should automatically increment the messages ids', function(done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Uno User' }
    }, function () {
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/users',
        json: { username: 'Dos Users' }
      }, function () {
        request({
          method: 'POST',
          uri: 'http://127.0.0.1:3000/classes/users',
          json: { username: 'Three Amigos' }
        }, function () {
          var queryString = 'SELECT * FROM users';
          var queryArgs = [];

          dbConnection.query(queryString, queryArgs, function(err, users) {
            var usersResults = users.sort((a, b) => a.UserID - b.UserID);
            expect(users.length).to.equal(3);
            expect(usersResults[0].username).to.equal('Uno User');
            expect(usersResults[1].username).to.equal('Dos Users');
            expect(usersResults[2].username).to.equal('Three Amigos');
            done();
          });
        });
      });
    });
  });
});
