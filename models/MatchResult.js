module.exports = ( sequelize, DataTypes ) => {
    //Create db schema
    const MatchResult = sequelize.define( 'matchresult' , {
        result_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          match_id: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          home_score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
          },
          away_score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
          },
          winner_team_id: {
            type: DataTypes.INTEGER,
            allowNull: true // null in case of draw
          }
    });

    //create helper association helper
    MatchResult.associate = ( db ) => {
        MatchResult.belongsTo(db.Match, { foreignKey: 'match_id' });
        MatchResult.belongsTo(db.Team, { foreignKey: 'winner_team_id', as: 'Winner' });
    }

    return MatchResult;
}