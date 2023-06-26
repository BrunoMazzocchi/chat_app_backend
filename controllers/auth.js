const { response } = require('express');
const User  = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const createUser = async (req, res = response ) => {

    const { email, nickname } = req.body;

    try {
        const emailExists = await User.findOne({ email });
        if ( emailExists ) {
            return res.status(400).json({
                ok: false,
                msg: 'Email already exists.'
            });
        }

        const nicknameExists = await User.findOne({ nickname });
        if ( nicknameExists ) {
            return res.status(400).json({
                ok: false,
                msg: 'Nickname already exists.'
            });
        }
    
        const user = new  User (req.body);

        // Encrypt password
        
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( user.password, salt );

        // Save user
        await  user.save();

        // Generate JWT
        const token = await generateJWT( user.id );
         
    res.json({
        ok: true,
        user, 
        token
    });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }




    
};

module.exports = {
    createUser
}