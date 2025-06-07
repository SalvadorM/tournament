'use strict'

const express = require('express');

const standingsController = require('../controllers/standingsController')

//create router instance
const router = express.Router();

//route     /standings/:tournamentId
router.use('/:tournamentId', standingsController.getTournamentStandings );


module.exports = router;