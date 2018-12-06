const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../auth/AuthMiddleware');
const UserCtrl = require('./controllers/UserCtrl');
// const AuthCtrl = require('../user-auth/AuthCtrl');

// router.post('/register', AuthCtrl.register);
// router.post('/login', AuthCtrl.login);
// router.post('/logout', AuthCtrl.logout);
// // router.get('/dummy', AuthCtrl.dummy);
//
router.get('/', AuthMiddleware.loginCheck, UserCtrl.list);
router.get('/:id', AuthMiddleware.loginCheck, UserCtrl.read);
// router.post('/:id', AuthMiddleware.loginCheck, UserCtrl.create);
router.put('/:id', AuthMiddleware.loginCheck, UserCtrl.update);
//
module.exports = router;
