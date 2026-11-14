const express = require('express')

const router = express.Router()

const {AirportController} = require('../../controllers')
const {AirportMiddleware} = require('../../middleware')

// /api/v1/airplanes POST
router.post('/',AirportMiddleware.validateCreateAirport,AirportController.createAirport)

// /api/v1/airplanes GET
router.get('/',AirportController.getAllAirport)

// /api/v1/airplanes/:id GET
router.get('/:id',AirportController.getAirport)

// /api/v1/airplanes/:id DELETE
router.delete('/:id',AirportController.deleteAirport)


// /api/v1/airplanes/:id PATCH
router.patch('/:id',AirportMiddleware.validateUpdateAirport,AirportController.updateAirport)

module.exports = router;