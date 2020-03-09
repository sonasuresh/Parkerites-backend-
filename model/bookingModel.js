const { executeQuery } = require('../db/executeQuery');
var dateTime = require('node-datetime');


async function createBooking(userId,slotId,vehicleId) {

    try {
        var status="inactive";

        // var query='SELECT vid from user_vehicle where uid=?;';
        // params=[userId];
        // var vehicleId=await executeQuery(query,params)
         const start=end=null;
        // vehicleId= vehicleId[0].vid
        query = 'INSERT INTO bookings(uid,start,end,sid,status,vid)VALUES(?,?,?,?,?,?);';
        params = [userId,start,end,slotId,status,vehicleId];
        const createBookingResults = await executeQuery(query, params);
        return createBookingResults;

    }
    catch (error) {
        throw error;
    }
}

async function getMyBookings(userId) {
    try {
        const query = 'SELECT * FROM bookings where uid=?;';
        const params=[userId]
        const getBookingResults = await executeQuery(query,params);
        return getBookingResults;
    } catch (error) {
        throw error;
    }
}
async function deleteBooking(bookingId) {
    try {
        if ( typeof bookingId == 'undefined') {

            throw new Error('Incomplete details to delete Booking!');
        }
        const query = 'DELETE FROM bookings WHERE id=?';
        const params = [bookingId];
        const createBookingResults = await executeQuery(query, params);
        return createBookingResults;

    }
    catch (error) {
        throw error;
    }
}
async function updateStatus(rfid) {
    try {
        // var query='DELETE FROM bookings where status=?;'
        // var params=['completed']
        // var deleteResults=await executeQuery(query,params);
        if ( typeof rfid == 'undefined') {

            throw new Error('Incomplete details to update status!');
        }
        var query = 'SELECT id FROM vehicles WHERE rfid=?';
        rfid=rfid.trim();
         var params = [rfid];
        var vehicleId = await executeQuery(query, params);
         var data = JSON.stringify(vehicleId[0])

        var json = JSON.parse(data);

        vehicleId =json["id"];

         query = `SELECT status FROM bookings WHERE vid='?' AND status!=?;`;
         params = [vehicleId,'completed'];
         //params = [18];

         const statusResult = await executeQuery(query, params);

         var data = JSON.stringify(statusResult[0])
         console.log(data)
        var json = JSON.parse(data);
         const status =json["status"];
        console.log(status)

        var start,end;
        var updatedStatus="";
        var dt ;
        var formattedstart,formattedend;
        
        if(status=="inactive"){
            updatedStatus="active";
            dt = dateTime.create();
            formattedstart = dt.format('Y-m-d H:M:S');
            start=formattedstart;
            query = 'UPDATE bookings SET status=?,start=? where vid=?';
            params = [updatedStatus,start,vehicleId];
           const updatedStatusResults = await executeQuery(query, params);
           return updatedStatusResults;
        }
        if(status=="active"){
            updatedStatus="completed";
            dt = dateTime.create();
            formattedend = dt.format('Y-m-d H:M:S');
            end=formattedend;
            query = 'UPDATE bookings SET status=?,end=? where vid=?';
            params = [updatedStatus,end,vehicleId];
           const updatedStatusResults = await executeQuery(query, params);
           return updatedStatusResults;
        }
        if(status=="completed"){
            updatedStatus="completed";
        }
        
    }
    catch (error) {
        throw error;
    }
}

module.exports = {
    createBooking,
    getMyBookings,
    deleteBooking,
    updateStatus
}