const {response} = require('express');
const User = require('../models/user');

const getUsers = async (req, res) => {

    // Pagination
    const from = Number(req.query.from) || 0;

    // Returns a list of users but the current user wtih the pagination
    const users = await User.find({_id: {$ne: req.uid}}).sort('-online').skip(from).limit(5);

    res.json({
        ok: true,
        users
    });

}

module.exports = {
    getUsers
}
