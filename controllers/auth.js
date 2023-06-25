const { response } = require('express');
const { validationResult } = require('express-validator');

const createUser = async (req, res = response ) => {
    
    const errors = validationResult(req);

    if( !errors.isEmpty() ){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }
    

    res.json({
        ok: true,
        msg: 'Create user'
    });
};

module.exports = {
    createUser
}