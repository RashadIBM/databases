var controller = require('./controllers');
var router = require('express').Router();

//Connect controller methods to their corresponding routes
router.get('/messages', controller.messages.get);

router.post('/messages', controller.messages.post);

router.get('/users', controller.users.get);

router.post('/users', controller.users.post);

// Client errors out when uncommented, maybe the routes need to be built first
// router.get('/friends', controller.friends.get);
// router.post('/friends', controller.friends.post);

module.exports = router;

