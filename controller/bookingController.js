const logger = require('../lib/logger')
const bookingModel = require('../model/bookingModel')

async function createBooking(req, res) {
	try {
		const {userId,slotId,vehicleId } = req.body
		if ( typeof userId == 'undefined' && typeof slotId == 'undefined' && typeof vehicleId == 'undefined') {
			throw new Error('Incomplete details to delete Booking')
		}

		const createBookingResults = await bookingModel.createBooking(userId,slotId,vehicleId)
		res.status(200).send(createBookingResults)
	} catch (error) {
		logger.error(error.message)
		res.status(500).send(error)
	}
}

async function getMyBookings(req, res) {
	try {
		const {userId} =req.params
		const getBookingResults = await bookingModel.getMyBookings(userId)
		res.status(200).send(getBookingResults)
	} catch (error) {
		logger.error(error.message)
		res.status(500).send(error)
	}
}
async function deleteBooking(req, res) {
	try {
		const {bookingId } = req.params
		if ( typeof bookingId == 'undefined') {
			throw new Error('Incomplete details to delete Booking')
		}

		const deleteBookingResults = await bookingModel.deleteBooking(bookingId)
		res.status(200).send(deleteBookingResults)
	} catch (error) {
		logger.error(error.message)
		res.status(500).send(error)
	}
}
async function updateStatus(req, res) {
	try {
		const {rfid } = req.body
		if ( typeof rfid == 'undefined') {
			throw new Error('Incomplete details to update status')
		}

		const updateStatusResults = await bookingModel.updateStatus(rfid)
		res.status(200).send(updateStatusResults)
	} catch (error) {
		logger.error(error.message)
		res.status(500).send(error)
	}
}


module.exports = {
	createBooking,
	getMyBookings,
	deleteBooking,
	updateStatus

}