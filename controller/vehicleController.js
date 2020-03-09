const logger = require('../lib/logger')
const vehicleModel = require('../model/vehicleModel')

async function createVehicle(req, res) {
	try {
		const {vehicleNumber,rfid,userId } = req.body
		if ( typeof vehicleNumber == 'undefined' && typeof rfid == 'undefined'&& typeof userId=='undefined') {
			throw new Error('Incomplete details to create a new Vehicle')
		}
		const createVehicleResults = await vehicleModel.createVehicle(vehicleNumber,rfid,userId)

		res.status(200).send(createVehicleResults)
	} catch (error) {
		logger.error(error.message)
		res.status(500).send(error)
	}
}

async function getUserVehicles(req,res){
	try {
		const {userId}=req.params;
		const getUserVehiclesResults = await vehicleModel.getUserVehicles(userId)
		res.status(200).send(getUserVehiclesResults)
		
	} catch (error) {
		logger.error(error.message)
		res.status(500).send(error)
	}
}

async function getVehicles(req, res) {
	try {
		const getVehicleResults = await vehicleModel.getVehicles()
		res.status(200).send(getVehicleResults)
	} catch (error) {
		logger.error(error.message)
		res.status(500).send(error)
	}
}


module.exports = {
	createVehicle,
	getVehicles,
	getUserVehicles
}