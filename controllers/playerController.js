'use strict';

const db = require('../config/database');
const Player = db.Player;
const Team = db.Team;

class playerController {

    //@route    GET player/team/:teamId
    //@desc     Get the all the players from team 
    async getAllPlayersTeam( req, res ) {
        try {
            const teams = await Team.findAll({
                where: { id: req.params.teamId },
                include: [{ model: Player, as: 'Players' }]
            })
            res.json({success: true, data: teams });

        }
        catch ( error ){
            console.log(error);
            res.status(500).json({ error: 'Server error', errorData: error})

        }
    }

    //@route    POST player/create
    //@desc     create a new team using tournamentId
    async createPlayer( req, res ) {
        try {

            const foundPlayerDuplicate = await Player.findOne({where: {name: req.body.name}})

            if ( foundPlayerDuplicate ) {
                res.json({success: false, error: 'Duplicate Found'});
            } else {
                const { name, teamId } = req.body;
                const player = await Player.create({ name, teamId });
                res.json({ success: true, data: player })
            }
            
        } catch( error ) {
            console.log( error )
            res.status(400).json( {success: false, error} );
        }
    }
}

module.exports = new playerController;