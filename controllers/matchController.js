'use strict'

const db = require('../config/database');
const Match = db.Match
const Team = db.Team
const MatchResult = db.MatchResult

class matchController {

    //@route    GET match/tournament/:tournamentId
    //@desc     Get all the match based on tournamentId
    async getTournamentMatches( req, res ){
        try{

            const { tournamentId } = req.params
            const matches = await Match.findAll({
                where: { tournamentId },
                include: [
                    { model: Team, as: 'homeTeam' },
                    { model: Team, as: 'awayTeam' },
                    { model: MatchResult },
                ]
            })

            res.json({ success: true, data: matches })

        }catch( error ){
            console.log(error);
            res.status(500).json({ error: 'Server error', errorData: error})
        }
    }

    //@route    POST match/create
    //@desc     create a new match using tournament and team ids 
    async createMatch( req, res ){
        try {
            const { tournamentId, home_team_id, away_team_id, status } = req.body
            const newMatch = await Match.create({
                tournamentId,
                away_team_id,
                home_team_id,
                status
            })

            res.json({ success: true, data: newMatch })

        } catch( error ){
            console.log( error )
            res.status(400).json( {success: false, error} );      
        }
    }

    //@route    GET /match/:matchId
    async getSingleMatch( req, res ){
        try {
            const { matchId } = req.params;
            const match = Match.findByPk(
                matchId, {
                    include: [
                        { model: Team, as: 'home_team_id' },
                        { model: Team, as: 'away_team_id' },
                        { model: MatchResult },
                    ]
                }
            )

            if ( !match ) return res.status(404).json({ success: false, error: 'Match not found'})
            
            res.json({ success: true, data: match })
        }catch( error ){
            console.log( error )
            res.status(400).json( {success: false, error} );        
        }
    }

}

module.exports = new matchController;