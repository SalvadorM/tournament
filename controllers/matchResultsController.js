'use strict'

const db = require('../config/database');
const MatchResult = db.MatchResult;
const Match = db.Match
const Team = db.Team
const standingsService = require('../services/StandingsService')

class matchResultsController {
    
    //@route    POST matchresults/create
    //@desc     create a new match results based on matchid 
    async createMatchResult( req, res ) {
        try{ 
            const { match_id, home_score, away_score, winner_team_id } = req.body 
            const existingResult = await MatchResult.findOne({ where: { match_id } });
            if (existingResult) {
            return res.status(400).json({success: false,  error: 'Result already exists for this match' });
            }

            const newResult = await MatchResult.create({
                match_id,
                home_score, 
                away_score,
                winner_team_id
            })

            res.json({ success: true, data: newResult })
        }catch( error ){
            console.log( error )
            res.status(400).json( {success: false, error} );    
        }
    }

    //@route    GET matchresults/:matchResultsId
    //@desc     get match results info based on matchResultsId
    async getMatchResult( req, res ){
        try{
            const { matchResultsId } = req.params;

            const result = await MatchResult.findByPk(matchResultsId, {
                include: [
                    { model: Match,
                        include: [
                            { model: Team, as: 'homeTeam' },
                            { model: Team, as: 'awayTeam' }
                        ]
                     },
                    { model: Team, as: 'Winner' }
                ]
                });

            if (!result) return res.status(404).json({success: false, error: 'Match result not found' });

            res.json({ success: true, data: result })

        }catch( error ){
            console.log( error )
            res.status(400).json( {success: false, error} );  
        }
    }

    //@route    GET matchresults/tournament/:tournamentId
    //@desc     get match results for tournament
    async getAllMatchesTournament( req, res ){
        try {
            const { tournamentId } = req.params 
            const results = await MatchResult.findAll({
                include: [
                    { model: Match,
                        where: { tournamentId }
                     },
                    { model: Team, as: 'Winner' }
                ]
            });
            
            res.json({ success: true, data: results });

        } catch( error ) {
            console.log(error);
            res.status(500).json({ error: 'Server error', errorData: error})
        }
    }

    //@route     PUT matchresults/:matchResultsId
    //@desc      Update match results base on matchResultsId and body data
    async updateMatchResult( req, res ){
        try {
            const { matchResultsId } = req.params;
            const { home_score, away_score, winner_team_id } = req.body;

            const result = await MatchResult.findByPk(matchResultsId);
            if (!result) return res.status(404).json({success: false, error: 'Match result not found' });

            await result.update({ home_score, away_score, winner_team_id });

            res.json(result);
        } catch( error ) {
            console.log( error )
            res.status(400).json( {success: false, error} );    
        }
    }

    //@route     PUT matchresults/completed
    //@desc      Update match result 
    async updateMatchCompleted( req, res ){
        try {
            const { matchId, status } = req.body

            const match = await Match.findByPk(matchId);
            if (!match) return res.status(404).json({ error: 'Match not found' });

            await match.update({ status });

            if ( status == 'completed' ){
                const success = await standingsService.updateStandingOnMatchComplete( matchId, status)
    
                if (success) {
                    res.status(200).json({ success: true, message: 'Standings updated successfully.' });
                } else {
                    res.status(500).json({ success: false,  error: 'Failed to update standings.' });
                }
            }

        }catch( error ) {
            console.log( error )
            res.status(400).json( {success: false, error} );         
        }
    }
}

module.exports = new matchResultsController;