const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

router.post('/user', registerController.handleNewUser);
router.post('/admin', registerController.handleNewAdmin);
router.post('/editor', registerController.handleNewEditor);

module.exports = router;
