'use strict';

const express = require('express');
const userController = require('../controllers/user');

//Create router instance 
const router = express.Router();

//@route    GET user/all
router.get('/all', userController.getAllUsers );

module.exports = router;