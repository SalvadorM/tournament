'use strict';

//retrieve models 
const db = require('../config/database');
const User = db.User


class userController {
    //@route    GET user/all
    //@desc     Get the all the users from database
    async getAllUsers( req, res ){
        try {
            const users = await User.findAll( { attributes: { exclude: ['password','updatedAt']} })
            // Return array directly
            res.json( users )
        }
        catch(e) {
            console.error(e); // Log error for debugging
            res.status(500).json({ error: 'Server error', errorData: e})
        }
    }
}

//purely for routing
module.exports = new userController;




