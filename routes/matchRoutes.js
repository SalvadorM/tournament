'use strict'

const express = require('express');
const matchController = require('../controllers/matchController');

//create router instance 
const router = express.Router()

//@route    GET match/tournament/:tournamentId
router.get('/tournament/:tournamentId', matchController.getTournamentMatches );

//@route    POST match/create
router.post('/create', matchController.createMatch );

//@route    GET /match/:matchId
router.get('/:matchId', matchController.getSingleMatch );

//@route    PUT /match/update/:matchId
router.put('/update/:matchId', matchController.updateMatch );

module.exports = router;