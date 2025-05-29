module.exports = ( sequelize, DataTypes ) => {
    //create db Schema
    const Player = sequelize.define( 'player', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        goals: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        jersey_number: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });

    //Create helper function
    Player.associate = ( db ) => {
        Player.belongsTo( db.Team, { foreignKey: 'teamId', as: 'team'} );
    }


    return Player;
}