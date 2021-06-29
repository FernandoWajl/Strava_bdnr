var express = require('express');
const UserController = require('./usersController');

const router = express.Router();
const userController = new UserController();

router.post('/', function (req, res) {
  userController.createUser(req, res);
});

router.get('/:id', function (req, res) {
  userController.getUser(req, res);
});

router.get('/', function (req, res) {
  userController.getAll(req, res);
});

module.exports = router;
