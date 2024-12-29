const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const authController = require('../controllers/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', passport.authenticate('jwt', { session: false }), authController.logout);
router.post('/changePassword', passport.authenticate('jwt', { session: false }), authController.changePassword);

module.exports = router;
