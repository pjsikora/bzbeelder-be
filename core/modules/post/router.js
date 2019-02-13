const express = require('express');
const router = express.Router();
const postCtrl = require('./PostController');
const AuthMiddleware = require('../auth/AuthMiddleware');
const mids = AuthMiddleware.loginCheck;

router
  .get('/', mids, postCtrl.list)
  .get('/:id', mids, postCtrl.read)
  .post('/', mids, postCtrl.create)
  .put('/:id', mids, postCtrl.update)
  .delete('/:id', mids, postCtrl.delete);

module.exports = router;
