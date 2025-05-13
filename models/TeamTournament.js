module.exports = ( sequelize, DataTypes ) => {
    const TeamTournament = sequelize.define( 'teamtournament')

    TeamTournament.associate = ( db ) => {
        TeamTournament.belongsTo( db.Tournament );
        TeamTournament.belongsTo( db.Team );
    }

    return TeamTournament;
}