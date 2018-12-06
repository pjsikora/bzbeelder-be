const express = require('express');
const router = express.Router();
const AuthCtrl = require('./AuthCtrl');

router.post('/register', AuthCtrl.register);
router.post('/login', AuthCtrl.login);
router.post('/logout', AuthCtrl.logout);

module.exports = router;
