let SerialPort = require('serialport')
const bookingController=require('../controller/bookingController');
const bookingModel=require('../model/bookingModel');
const Delimiter = require('@serialport/parser-delimiter')
let port = new SerialPort('COM3',{
    baudRate: 115200,
    autoOpen: true
}).setEncoding('utf8')
// port.on('data', function (data) {
//     console.log('Data:', data);
// });
const parsedPort = port.pipe(new Delimiter({ delimiter: '\n' }))

console.log('PORT Opened')
parsedPort.on('data', data => {
    let rfid =data.toString();
    console.log('rfid : ', rfid)
    bookingModel.updateStatus(rfid)
})