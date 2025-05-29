'use strict';

//retrieve moddels to user 
const db = require('../config/database');
const Team = db.Team
const TeamTournamet = db.TeamTournament

class teamController {
    //CRUD for Tournament
    //ROUTE PATTERN 
    //@route    GET team/tournament/:tournamentId
    //@desc     Get the all the teams based on tournament id
    async getAllTeamsTournament( req, res ){
        try {
            const tournamentId = req.params.tournamentId
            const teamsByTournament = await TeamTournamet.findAll({where: {tournamentId} });

            res.json( teamsByTournament );
        }
        catch( e ){
            console.log( e );
            res.status(500).json({ error: 'Server error', errorData: e})
        }
    }

    //@route    GET team/all
    //@desc     Get the all the teams 
    async getAllTeams( req, res ) {
        try {
            const teams = await Team.findAll()
            res.json({success: true, data: teams });

        }
        catch ( error ){
            console.log(error);
            res.status(500).json({ error: 'Server error', errorData: error})

        }
    }

    //@route    POST team/create
    //@desc     create a new team using tournamentId
    async createTeam( req, res ) {
        try {

            const foundTeamDuplicate = await Team.findOne({where: {name: req.body.name}})

            if ( foundTeamDuplicate ) {
                res.json({success: false, error: 'Duplicate Found'});
            } else {
    
                const newTeam = await Team.create({name: req.body.name})
                const newTeamTournamentAssociation = await TeamTournamet.create({tournamentId: req.body.tournamentId, teamId: newTeam.dataValues.id })
                res.json({ success: true, data: newTeamTournamentAssociation })
            }
            
        } catch( error ) {
            console.log( error )
            res.status(400).json( {success: false, error} );
        }
    }

    //route     UPDATE team/:teamId
    async updateTeam( req, res ) {
        try {
            const { name } = req.body;
            const id = req.params.teamId
            const [updatedTeam] = await Team.update( {name} , {where: {id} } )

            if (updatedTeam) {
                const updatedUser = await Team.findByPk(id);
                res.status(200).json(updatedUser);
              } else {
                res.status(404).json({ error: 'Team not found' });
              }
        }
        catch( error ) {
            console.log( error )
            res.status(400).json( {success: false, error} );
        }
    }

}

module.exports = new teamController;