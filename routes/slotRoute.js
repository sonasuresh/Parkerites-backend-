const router = require('express').Router();
const slotController = require('../controller/slotController');

router.get('/available',slotController.getAvailableSlots);

router.get('/', slotController.getSlots);


module.exports = router;