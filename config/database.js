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

//Models 
db.User = require('../models/User')(sequelize, Sequelize.DataTypes);



module.exports = db;