module.exports = ( sequelize, DataTypes ) => {
    const Standing = sequelize.define( 'standing', {
        tournamentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        team_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        matches_played: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        points: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        wins: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        losses: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        draws: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        goals_for: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        goals_against: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        goal_difference: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }
        }, {
            indexes: [
                {
                    unique: true,
                    fields: ['tournamentId', 'team_id']
                }
            ],
            hooks: {
                beforeSave: (standing) => {
                    // Automatically calculate goal difference
                    standing.goal_difference = standing.goals_for - standing.goals_against;
                }
            }
        });

    //create helper association helper
    Standing.associate = ( db ) => {
        Standing.belongsTo(db.Tournament, { foreignKey: 'tournamentId' });
        Standing.belongsTo(db.Team, { foreignKey: 'team_id' });
    }

    return Standing;
}