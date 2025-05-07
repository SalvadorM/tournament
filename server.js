'use strict';

//Create express app 
const express = require('express');
const app = express()

//get routes 
const userRoutes = require('./routes/userRoutes');

//database sequelize init
const db = require('./config/database');

// Use PORT from environment or fallback
const PORT = process.env.PORT || 3000;

//Middleware
//Parse req as json
app.use( express.json() );


//Routes
app.use( '/user' , userRoutes );


app.get('/', (req, res) => {
    res.send('Hello from AWS Lightsail!');
});


//Create or check if database is currently created
//server to init and listen on port   
db.sequelize.sync({}).then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
}).catch(err => {
    console.error('Failed to sync database:', err);
});