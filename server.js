'use strict';

//Create express app 
const express = require('express');
const app = express()

//database sequelize init
const db = require('./config/database');

// Use PORT from environment or fallback
const PORT = process.env.PORT || 3000;

//Middleware
//Parse req as json
app.use( express.urlencoded() );
app.use( express.json() );

//get routes 
const userRoutes = require('./routes/userRoutes');
const tournamentRoutes = require('./routes/tournamentRoutes');
const teamRoutes = require('./routes/teamRoutes');

//Routes
app.use( '/user' , userRoutes );
app.use( '/tournament' , tournamentRoutes );
app.use( '/team' ,teamRoutes);

app.get('/', (req, res) => {
    res.send('Hello from AWS Lightsail!');
});


//Create or check if database is currently created
//server to init and listen on port   
db.sequelize.sync({force: true}).then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
}).catch(err => {
    console.error('Failed to sync database:', err);
});