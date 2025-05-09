'use strict'

const express = require('express');
const tournamentController = require('../controllers/tournamentController');

//create router instance 
const router = express.Router()

//@route    GET tournament/all
router.get('/all', tournamentController.getAllTournament );
//@route    POST tournament/create
router.post('/create', tournamentController.createTournament );


module.exports = router;