'use strict';

const db = require('../config/database');
const Standing = db.Standing
const Team = db.Team

class standingsController {
    //@route    /standings/:tournamentId
    //@desc     get standings based on 
    async getTournamentStandings( req, res ){
        try {

            const { tournamentId } = req.params;
            const standings = await Standing.findAll({
                where: { tournamentId },
                include: [{ model: Team }]
            })

            res.json({success: true, data: standings})
        }catch( error ) {
            console.log(error);
            res.status(500).json({ error: 'Server error', errorData: error})
        }
    }

    //@route    /standings/formatted/:tournamentId
    //@desc     get the formatted standings table 
    async getTableStandings( req, res ){
        try {
            const { tournamentId } = req.params;
            const standings = await Standing.findAll({
                where: { tournamentId },
                include: [{ model: Team }],
                order: [
                    ['points', 'DESC'],
                    ['goal_difference', 'DESC']
                ],
            })

            res.json({success: true, data: standings})
        } catch( error ) {
            console.log(error);
            res.status(500).json({ error: 'Server error', errorData: error})     
        }
    }

}

module.exports = new standingsController;