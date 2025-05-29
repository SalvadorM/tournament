'user strict';

const express = require('express');
const playerController = require('../controllers/playerController');

//create router instance 
const router = express.Router();

//@route    GET player/team/:teamId
router.get('/team/:teamId', playerController.getAllPlayersTeam );

//route     POST player/create
router.post('/create', playerController.createPlayer );

module.exports = router;