const express = require('express')

const router = express.Router()
const airplaneRoutes = require('./airplane-routes')
const cityRoutes = require('./city-routes')
const airportRoutes = require('./airport-routes')
const flightRoutes = require('./flight-routes')

router.use('/airplanes',airplaneRoutes)
router.use('/city',cityRoutes)
router.use('/airport',airportRoutes)
router.use("/flights",flightRoutes)


module.exports= router