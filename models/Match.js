module.exports = ( sequelize , DataTypes ) => {
    //Create db Schema
    const Match = sequelize.define( 'match', {
        tournament_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }, 
        home_team_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }, 
        away_team_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }, 
        status: {
            type: DataTypes.ENUM('scheduled', 'completed', 'postponed'),
            allowNull: false,
            defaultValue: 'scheduled'
        }, 

    });

    //Create associate helper function
    Match.associate = ( db ) => {
        Match.belongsTo(db.Tournament, { foreignKey: 'tournament_id' });
        Match.belongsTo(db.Team, { foreignKey: 'home_team_id', as: 'homeTeam' });
        Match.belongsTo(db.Team, { foreignKey: 'away_team_id', as: 'awayTeam' });
        Match.hasOne(db.MatchResult, { foreignKey: 'match_id' });
    }


    return Match;
}