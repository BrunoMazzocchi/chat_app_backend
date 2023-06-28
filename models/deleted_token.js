const {Schema, model} = require('mongoose');

const DeletedTokenschema = Schema({
 
    token: {
        type: String,
        required: [false, 'Token is required']
    },
    date : {
        type: Date,
        default: Date.now
    }

});

module.exports = model('DeletedToken', DeletedTokenschema);