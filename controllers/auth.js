const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {

    const { email, nickname } = req.body;

    try {
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({
                ok: false,
                msg: 'Email already exists.'
            });
        }

        const nicknameExists = await User.findOne({ nickname });
        if (nicknameExists) {
            return res.status(400).json({
                ok: false,
                msg: 'Nickname already exists.'
            });
        }

        const user = new User(req.body);

        // Encrypt password

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);

        // Save user
        await user.save();

        // Generate JWT
        const token = await generateJWT(user.id);

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

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'User does not exist.'
            });
        }

        // Confirm passwords
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password is not valid.'
            });
        }


        // Generate JWT
        const token = await generateJWT(user.id);


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
            msg: 'Unable to login. Please contact the administrator'
        });
    }
}

module.exports = {
    createUser,
    login
}