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
const playerRoutes = require('./routes/playerRoutes');
const matchRoutes = require('./routes/matchRoutes')
const matchResultRoutes = require('./routes/matchResultsRoutes')
const standingsRoutes = require('./routes/standingsRoutes')

//Routes
app.use( '/user' , userRoutes );
app.use( '/tournament' , tournamentRoutes );
app.use( '/team' ,teamRoutes );
app.use( '/player', playerRoutes );
app.use( '/match', matchRoutes );
app.use( '/matchresults', matchResultRoutes);
app.use( '/standings', standingsRoutes)

app.get('/', (req, res) => {
    res.send('Hello from AWS Lightsail!');
});


//Create or check if database is currently created
//server to init and listen on port   
db.sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
}).catch(err => {
    console.error('Failed to sync database:', err);
});