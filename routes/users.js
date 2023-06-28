/*  

 path = /api/users'

*/

const { Router } = require('express');
const router = Router();
const { validateToken } = require('../middlewares/validate_token');
const { getUsers } = require('../controllers/users');

router.get('/', validateToken, getUsers);



module.exports = router;