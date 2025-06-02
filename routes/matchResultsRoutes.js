'use strict'

const express = require('express');
const matchResultsController = require('../controllers/matchResultsController');

//create router instance 
const router = express.Router()

//route     GET matchresults/:matchResultsId
router.get('/:matchResultsId', matchResultsController.getMatchResult );

//route     POST matchresults/create
router.post('/create', matchResultsController.createMatchResult)

//route     GET matchresults/tournament/:tournamentId
router.get('/tournament/:tournamentId', matchResultsController.getAllMatchesTournament );

//route     PUT matchresults/:matchResultsId
router.put('/update/:matchResultsId', matchResultsController.updateMatchResult )

//route     PUT matchresults/completed
router.put('/completed', matchResultsController.updateMatchCompleted );


module.exports = router;