'use strict'

const db = require('../config/database');
const MatchResult = db.MatchResult;
const Match = db.Match
const Team = db.Team

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


}

module.exports = new matchResultsController;