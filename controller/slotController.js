const logger = require('../lib/logger')
const slotModel = require('../model/slotModel')

async function getSlots(req, res) {
	try {
		const getSlotResults = await slotModel.getSlots()
		res.status(200).send(getSlotResults)
	} catch (error) {
		logger.error(error.message)
		res.status(500).send(error)
	}
}

async function getAvailableSlots(req,res){
	try {
		const getAvailableSlotResults = await slotModel.getAvailableSlots()
		res.status(200).send(getAvailableSlotResults)
	} catch (error) {
		logger.error(error.message)
		res.status(500).send(error)
	}
}


module.exports = {
	getSlots,
	getAvailableSlots
}