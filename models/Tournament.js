module.exports = ( sequelize, DataTypes ) => {
    //Create db Schema 
    const Tournament = sequelize.define( 'tournament', {
        name: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
        season: {
            type: DataTypes.STRING(),
            allowNull: false, 
        }
    },{
        timestamps: true // adds createdAt and updatedAt
    });


    //create an associate helper function
    Tournament.associate = ( db ) => {
        Tournament.belongsToMany( db.Team, { through: db.TeamTournament })
        Tournament.hasMany( db.Match, { foreignKey: 'tournamentId' });
        Tournament.hasMany( db.Standing, { foreignKey: 'tournamentId'});
    } 

    return Tournament;
}