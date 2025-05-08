module.exports = ( sequelize, DataTypes ) => {
    const Standing = sequelize.define( 'standing', {
        tournament_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        team_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        points: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        wins: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        losses: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        draws: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        goals_for: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        goals_against: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    //create helper association helper
    Standing.associate = ( db ) => {
        Standing.belongsTo(db.Tournament, { foreignKey: 'tournament_id' });
        Standing.belongsTo(db.Team, { foreignKey: 'team_id' });
    }

    return Standing;
}