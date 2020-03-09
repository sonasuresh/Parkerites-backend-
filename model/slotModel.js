const { executeQuery } = require('../db/executeQuery');

async function getSlots() {
    try {
        const query = 'SELECT * FROM slots;';
        const getSlotResults = await executeQuery(query);
        return getSlotResults;
    } catch (error) {
        throw error;
    }
}
async function getAvailableSlots(){
    try {
        var allSlotsarr=[];
        var notAvailableSlotsarr=[];
        var availableSlotsarr=[];
        var query = 'SELECT * FROM slots;';
        const allSlots = await executeQuery(query);
        for(i =0;i<allSlots.length;i++){
            var data = JSON.stringify(allSlots[i])
            
            var json = JSON.parse(data);
            allSlotsarr.push(json.id);
        }
        query='SELECT * FROM bookings WHERE (start IS NULL AND end IS NULL) or end IS NULL ;'
        const slotsNotAvailable=await executeQuery(query);
        for(i =0;i<slotsNotAvailable.length;i++){
            var data = JSON.stringify(slotsNotAvailable[i])
            
            var json = JSON.parse(data);
            notAvailableSlotsarr.push(json.sid);
        }
        let difference = allSlotsarr.filter(x => !notAvailableSlotsarr.includes(x));
        return difference;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    getSlots,
    getAvailableSlots
}