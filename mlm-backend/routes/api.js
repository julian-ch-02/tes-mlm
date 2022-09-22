const express = require('express');
const userController = require('../controller/user.controller');
const router = express.Router();

// user
router.post('/register', userController.register);
router.get('/:id', userController.checkUplineId);
router.post('/', userController.findOne);

module.exports = router;
