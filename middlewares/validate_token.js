const jwt = require('jsonwebtoken');

const validateToken = ( req, res, next ) => {

    // Leer token
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No token provided'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.JWT_KEY );
        req.uid = uid;
        
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        })
    }




}


module.exports = {
    validateToken
}