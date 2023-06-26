/*  

 path = /api/login/new'

*/

const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();
const { createUser } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate_fields');

router.post('/new', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('password', 'Password must include at least 1 character or number').matches(/^(?=.*\d)(?=.*[a-z])[0-9a-z]{6,}$/i), 
    check('nickname', 'Nickname is required').not().isEmpty(),
    validateFields

], createUser);


module.exports = router;