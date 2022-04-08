const express = require('express');
const userController = require('../controller/control');
const { validator, result } = require('../middleware/validator');

const router = express.Router();


// Mes differentes routes
router.get('/', userController.afficheCreateCompte); 

router.post('/',validator,userController.insert);


module.exports = router;