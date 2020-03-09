const router = require('express').Router();
const bookingController = require('../controller/bookingController');

router.post('/', bookingController.createBooking);

router.get('/:userId', bookingController.getMyBookings);

router.put('/', bookingController.updateStatus);

router.delete('/:bookingId', bookingController.deleteBooking);



module.exports = router;