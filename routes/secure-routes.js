const express = require('express');
const passport = require('passport');

const router = express.Router();

const user = require('../controllers/user');

router.post('/profile', passport.authenticate('jwt', { session : false }), user.profile);

module.exports = router;
