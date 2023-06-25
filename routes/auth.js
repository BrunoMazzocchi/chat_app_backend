/*  

 path = /api/login/new'

*/

const { Router, response } = require('express');
const { check } = require('express-validator');

const router = Router();
const { createUser } = require('../controllers/auth');

router.post('/new', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 }),
] ,createUser);

module.exports = router;