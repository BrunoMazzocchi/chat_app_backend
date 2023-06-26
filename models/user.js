const {Schema, model} = require('mongoose');

const Userschema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required'], 
    }, 
    online: {
        type: Boolean,
        default: false
    },
    nickname: {
        type: String,
        unique: true,
        required: [true, 'Nickname is required']
    },

});

Userschema.method('toJSON', function(){
    const {__v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
});


module.exports = model('User', Userschema);