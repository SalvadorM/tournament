'user strict'

const express = require('express');
const teamController = require('../controllers/teamController');

//create router instance
const router = express.Router();

//@route    GET team/tournament/:tournamentId
router.get('/tournament/:tournamentId', teamController.getAllTeamsTournament );
//@route    GET team/all
router.get('/all', teamController.getAllTeams );
//@route    POST team/create
router.post('/create', teamController.createTeam );

module.exports = router;