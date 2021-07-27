var express = require('express');
var router = express.Router();
var users = require('../controllers/user.controller.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', users.create);
router.post('/login', users.login);
router.put('/user/:id', users.update);
router.delete('/user/:id', users.delete);
router.get('/users', users.getAll);

module.exports = router;
