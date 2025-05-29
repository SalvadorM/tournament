'use strict';

const db = require('../config/database');
const Player = db.Player;
const Team = db.Team;

class playerController {

    //@route    GET player/team/:teamId
    //@desc     Get the all the players from team 
    async getAllPlayersTeam( req, res ) {
        try {
            const { teamId } = req.params
            const teams = await Team.findAll({
                where: { id: teamId },
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

            const { name, teamId} = req.body
            const foundPlayerDuplicate = await Player.findOne({where: {name}})

            if ( foundPlayerDuplicate ) {
                res.json({success: false, error: 'Duplicate Found'});
            } else {
                const player = await Player.create({ name, teamId });
                res.json({ success: true, data: player })
            }
            
        } catch( error ) {
            console.log( error )
            res.status(400).json( {success: false, error} );
        }
    }

    //@route     DELETE player/delete/:playerId
    //@desc      Delete a player by playerId
    async deletePlayer( req, res ){
        try {
            const { playerId } = req.params;
            const player = await Player.findByPk(playerId)

            if( !player ){
                return res.status(404).json({ success: false, error: 'Player not found' });
            }

            await player.destroy();
            res.json({ success: true, message: 'Player deleted successfully' });

        } catch( error ){
            console.log( error )
            res.status(400).json( {success: false, error} );
        }
    }

    //@route     PUT  player/update/:playerId
    //@desc      update a player based on playerId and body name, teamId
    async updatePlayer( req, res ){
        try {
            const { playerId } = req.params;
            const { name, teamId } = req.body

            const player = await Player.findByPk(playerId)

            if( !player ) {
                return res.status(404).json({success: false, error: 'Player not found'})
            }

            await Player.update({name, teamId})
            res.json({ success: true, data: player})
            
        } catch( error ){
            console.log( error )
            res.status(400).json( {success: false, error} );
        }
    }
}

module.exports = new playerController;