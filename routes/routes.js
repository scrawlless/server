const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();
const secret = process.env.JWT_SECRET;

const auth = require('../controllers/auth');

router.post('/signup', passport.authenticate('signup', { session : false }), auth.signup);
router.post('/login', auth.login);

module.exports = router;
