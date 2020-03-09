const router = require('express').Router();
const vehicleController = require('../controller/vehicleController');

router.post('/', vehicleController.createVehicle);//create user
router.get('/:userId',vehicleController.getUserVehicles);//get particular users vehicle
router.get('/', vehicleController.getVehicles);//gets user


module.exports = router;