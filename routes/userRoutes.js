'use strict';

const express = require('express');
const userController = require('../controllers/userController.js');

//Create router instance 
const router = express.Router();

//@route    GET user/all
router.get('/all', userController.getAllUsers );

module.exports = router;