const router = require('express').Router();
const userController = require('../controller/userController');

router.post('/', userController.createUser);//create user

router.get('/', userController.getUsers);//gets user
router.post('/login', userController.login);


module.exports = router;