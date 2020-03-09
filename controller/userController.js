const logger = require('../lib/logger')
const userModel = require('../model/userModel')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')


async function createUser(req, res) {
	try {
		const {mobile,password } = req.body
		if ( typeof password == 'undefined' && typeof mobile == 'undefined') {
			throw new Error('Incomplete details to create a new User')
		}
		var hash = await bcrypt.hash(password, 2)
		 var createUserResults = await userModel.createUser(mobile,hash)
        console.log(createUserResults.insertId)
		createUserResults=createUserResults.insertId
		res.status(200).send({createUserResults})
	} catch (error) {
		logger.error(error.message)
		res.status(500).send(error)
	}
}

async function getUsers(req, res) {
	try {
		const getUserResults = await userModel.getUsers()
		res.status(200).send(getUserResults)
	} catch (error) {
		logger.error(error.message)
		res.status(500).send(error)
	}
}
async function login(req, res) {
	try {
		const { mobile, password } = req.body
		const match = await userModel.login(mobile, password)
		if (match) {
			var token = jwt.sign({ mobile: mobile }, 'secret')
			
			res.status(200).send({id:match.uid,token:token})
		} else {
			res.status(400).send('Username and Password doesnt match')
		}
	} catch (error) {
		logger.error(error.message)
		res.status(500).send(error)
	}
}

module.exports = {
	createUser,
	getUsers,
	login
}