const { executeQuery } = require('../db/executeQuery');
const bcrypt = require('bcryptjs')


async function createUser(mobile,password) {
    try {
        if (password == 'undefined' && mobile == 'undefined') {
            throw new Error('Incomplete details to create a new user!');
        }
        const query = 'INSERT INTO users(mobile,password)VALUES(?,?);';
        const params = [mobile,password];
        const createUserResults = await executeQuery(query, params);
        return createUserResults;

    }
    catch (error) {
        throw error;
    }
}

async function getUsers() {
    try {
        const query = 'SELECT id,password FROM users;';
        const getUsersResults = await executeQuery(query);
        return getUsersResults;
    } catch (error) {
        throw error;
    }
}

async function login(mobile, password) {
    try {
        const query = 'SELECT id,password FROM users where mobile=?;';
        const params = [mobile];
        const oPassword = await executeQuery(query, params);

        const match = await bcrypt.compare(password, oPassword[0].password);
         const res={
             uid:oPassword[0].id,
             match:match
         }
        return res;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    createUser,
    getUsers,
    login
}