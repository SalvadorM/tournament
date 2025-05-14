module.exports = ( sequelize, DataTypes ) => {
    const PlayersTeam = sequelize.define( 'playersteam')

    PlayersTeam.associate = ( db ) => {
        PlayersTeam.belongsTo( db.Player );
        PlayersTeam.belongsTo( db.Team );
    }

    return PlayersTeam;
}