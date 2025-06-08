'use strict'

const express = require('express');

const standingsController = require('../controllers/standingsController')

//create router instance
const router = express.Router();

//route     /standings/:tournamentId
router.get('/:tournamentId', standingsController.getTournamentStandings );

//route     /standings/formatted/:tournamentId
router.get('/formatted/:tournamentId', standingsController.getTableStandings );


module.exports = router;