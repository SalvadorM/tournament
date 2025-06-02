'use strict'

const express = require('express');
const standingsController = require('../controllers/standingsController')

//create router instance
const router = express.Router();

//route     /standings/:tournamentId
app.use('/:tournamentId', standingsController.getTournamentStandings );


module.exports = router;