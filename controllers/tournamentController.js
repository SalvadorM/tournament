'use strict';

const db = require('../config/database');
const Tournament = db.Tournament;

class tournamentController {
    //CRUD for Tournament
    //@route    GET tournament/all
    //@desc     Get the all the tournaments from database
    async getAllTournament( req, res ){
        try {
            const tournaments = await Tournament.findAll();

            res.json( tournaments );
        }
        catch( e ){
            console.log( e );
            res.status(500).json({ error: 'Server error', errorData: e})
        }
    }
    //@route    POST tournament/create
    //@desc     Create a new tournament
    async createTournament( req, res ) {
        try {
            const { name, season } = req.body
    
            const foundDuplicate = await Tournament.findOne({where: { name, season }});
            if ( foundDuplicate ) {
                res.json({success: false, error: 'Duplicate Found'});
            } else {
                const newTournament = await Tournament.create({ name, season });
                res.json({success: true, data: newTournament });
            }
        } catch ( error ) {
            console.log( error )
            res.status(400).json( {success: false, error} );
        }
    }

    
}

module.exports = new tournamentController;