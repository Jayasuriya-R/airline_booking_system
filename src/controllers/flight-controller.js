const { FlightService } = require('../services')
const { StatusCodes } = require('http-status-codes')
const { ErrorResponse } = require('../utils/common')
const { SuccessResponse } = require('../utils/common')

async function createFlight(req, res) {
    const data = {
        flightNumber : req.body.flightNumber,
        airplaneId :req.body.airplaneId,
        departureAirportId :req.body.departureAirportId,
        arrivalAirportId : req.body.arrivalAirportId,
        arrivalTime:req.body.arrivalTime,
        departureTime:req.body.departureTime,
        boardingGate:req.body.boardingGate,
        totalSeats:req.body.totalSeats
    }
    try {
        const response = await FlightService.createFlight(data)
        SuccessResponse.data = response;
        SuccessResponse.message = 'Successfully created Flight'
        return res.status(StatusCodes.CREATED).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = 'Something went wrong while creating Flight'
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

async function getAllFlights(req,res){
   try {
      const response = await FlightService.getAllFlights(req.query)
      SuccessResponse.data = response;
      SuccessResponse.message = 'Successfully fetched all the Flights'
      return res.status(StatusCodes.OK).json(SuccessResponse)
   } catch (error) {
    
      ErrorResponse.error = error;
      ErrorResponse.message = 'Something went wrong while fetching Flights'
     return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
   }
}

module.exports = {
   createFlight,
   getAllFlights
}