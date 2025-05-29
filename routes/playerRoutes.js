'user strict';

const express = require('express');
const playerController = require('../controllers/playerController');

//create router instance 
const router = express.Router();

//@route    GET player/team/:teamId
router.get('/team/:teamId', playerController.getAllPlayersTeam );

//route     POST player/create
router.post('/create', playerController.createPlayer );

//route     DELETE player/delete/playerId
router.delete('/delete/:playerId', playerController.deletePlayer );

//route     PUT player/update/:playerId
router.put('/update/:playerId', playerController.updatePlayer );

module.exports = router;