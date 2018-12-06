const express = require('express');
const router = express.Router();
const PostViewController = require('./controllers/PostViewController');


router.get('/', PostViewController.getPostsList);
router.get('/:id', PostViewController.getPost);


module.exports = router;
