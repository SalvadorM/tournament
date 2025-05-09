'use strict';

const { Sequelize } = require('sequelize');

//Set up SQLITE locally, 
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './tournamentdb.sqlite', // Path to your SQLite file
  logging: console.log, // Disable SQL query logging
});

//create object for Sequelize functions & models 
const db = { };
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Add models to the db object - 
db.User = require('../models/User')(sequelize, Sequelize.DataTypes);
db.Match = require('../models/Match')(sequelize, Sequelize.DataTypes);
db.MatchResult = require('../models/MatchResult')(sequelize, Sequelize.DataTypes);
db.Player = require('../models/Player')(sequelize, Sequelize.DataTypes);
db.Team = require('../models/Team')(sequelize, Sequelize.DataTypes);
db.Standing = require('../models/Standing')(sequelize, Sequelize.DataTypes);
db.Tournament = require('../models/Tournament')(sequelize, Sequelize.DataTypes);


//If a table schema has an association 
//run the assiciation helper function to run associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) db[modelName].associate(db);
});

module.exports = db;