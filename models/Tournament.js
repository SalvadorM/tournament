module.exports = ( sequelize, DataTypes ) => {
    //Create db Schema 
    const Tournament = sequelize.define( 'tournament', {
        tournament_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
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
        Tournament.hasMany( db.Match, { foreignKey: 'tournament_id' });
        Tournament.hasMany( db.Standing, { foreignKey: 'tournament_id'});
    } 

    return Tournament;
}