const { executeQuery } = require('../db/executeQuery');


async function createVehicle(vehicleNumber,rfid,userId){
    try {
        if ( typeof vehicleNumber == 'undefined' && typeof rfid == 'undefined' &&userId=='undefined') {
             throw new Error('Incomplete details to create a new vehicle!');
        }
        var query = 'INSERT INTO vehicles(vehicle_number,rfid)VALUES(?,?);';
        var params = [vehicleNumber,rfid];
        const createVehicleResults = await executeQuery(query, params);
        query = 'INSERT INTO user_vehicle(uid,vid)VALUES(?,?);';
        params=[userId,createVehicleResults.insertId]
        const userVehicleRResults=await executeQuery(query,params)
        return userVehicleRResults;
    }
    catch (error) {
        throw error;
    }
}

async function getUserVehicles(userId){
    try {
        var query='SELECT vid from user_vehicle where uid=?'
        var params=[userId]
        var getUserVehiclesResults=await executeQuery(query,params);
        const vid= JSON.parse(JSON.stringify(getUserVehiclesResults))

        var vids=[]
        for(i=0;i<vid.length;i++){
            vids.push(vid[i].vid)
        }
        console.log(vids)
        query='select id,vehicle_number from vehicles where id in(?);';
        params=[vids];
        getUserVehiclesResults=await executeQuery(query,params)
        return getUserVehiclesResults
    } catch (error) {
        throw error;
        
    }
}
async function getVehicles() {
    try {
        const query = 'SELECT * FROM vehicles;';
        const getVehiclesResults = await executeQuery(query);
        return getVehiclesResults;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    createVehicle,
    getVehicles,
    getUserVehicles
   
}