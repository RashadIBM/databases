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
          message: 'In mercy\'s name, three days is all I need.',
          roomname: 'Hello'
        }
      }, function () {
        // Now if we look in the database, we should find the
        // posted message there.

        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryString = 'SELECT * FROM messages'; //this was NOT changed
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function(err, results) {
          // Should have one result:
          expect(results.length).to.equal(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].userMessage).to.equal('In mercy\'s name, three days is all I need.'); // this was changed

          done();
        });
      });
    });
  });

  it('Should output all messages from the DB', function(done) {
    // Let's insert a message into the db
    var queryString = `INSERT INTO messages (userName, userMessage, roomName)
          VALUES ("Valjean\'s Sister", 'Men like you can never change!', 'main');`; //this was changed
    var queryArgs = [];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    dbConnection.query(queryString, queryArgs, function(err) {
      if (err) { throw err; }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
        // console.log('*** Test 2 Response *** \n', response, '*** Test 2 Response *** \n');
        var messageLog = JSON.parse(body);
        expect(messageLog[0].userMessage).to.equal('Men like you can never change!'); //this was changed (from .text to .userMessage)
        expect(messageLog[0].roomName).to.equal('main');
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
        var queryString = 'SELECT * FROM users WHERE userName="SpongeBob"';
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function(err, results) {
          // console.log('*** Username Test Results ***', results, '*** *** \n');
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
      // Post a message to the node chat server:
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/users',
        json: { username: 'Dos Users' }
      }, function () {
        // Post a message to the node chat server:
        request({
          method: 'POST',
          uri: 'http://127.0.0.1:3000/classes/users',
          json: { username: 'Three Amigos' }
        }, function () {
          var queryString = 'SELECT * FROM users'; //this was NOT changed
          var queryArgs = [];

          dbConnection.query(queryString, queryArgs, function(err, users) {
            expect(users.length).to.equal(3);
            // var usersResults = users.sort((a, b) => a.UserID - b.UserId);
            // console.log('*** Username Test Results ***\n', usersResults, '*** *** \n');
            // expect(usersResults[2].UserName).to.equal('Three Amigos');
            done();
          });
        });
      });
    });
  });
});
