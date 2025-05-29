module.exports = ( sequelize, DataTypes ) => {
    //Create db schema
    const Team = sequelize.define( 'team' , {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        logo_url: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
    })

    //Create associate helper function
    Team.associate = ( db ) => {
        //N:M through a join table
        Team.belongsToMany( db.Tournament, { through: db.TeamTournament } );
        //1:M 
        Team.hasMany( db.Player, { foreignKey: 'teamId', as: 'Players' });

        
        Team.hasMany( db.Match, { foreignKey: 'home_team_id', as: 'HomeMatches' });
        Team.hasMany( db.Match, { foreignKey: 'away_team_id', as: 'AwayMatches' });
        Team.hasMany( db.Standing, { foreignKey: 'teamId' });
        Team.hasMany( db.MatchResult, { foreignKey: 'winner_team_id', as: 'wins' });
    }



    return Team;
}