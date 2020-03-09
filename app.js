const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: ["http://localhost:4200"] }))

// Routes
const userRoute = require('./routes/userRoute.js');
const bookingRoute = require('./routes/bookingRoute.js');
const vehicleRoute = require('./routes/vehicleRoute.js');
const slotRoute = require('./routes/slotRoute.js');


app.use('/users', userRoute);
app.use('/booking',bookingRoute)
app.use('/vehicle',vehicleRoute)
app.use('/slots',slotRoute)


module.exports = app;