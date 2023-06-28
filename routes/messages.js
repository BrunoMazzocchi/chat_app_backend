
/*  

 path = /api/messages/:from'

*/


const { Router } = require('express');
const { validateToken } = require('../middlewares/validate_token');
const { getChat } = require('../controllers/messages');

const router = Router();

router.get('/:from', validateToken, getChat);

module.exports = router;