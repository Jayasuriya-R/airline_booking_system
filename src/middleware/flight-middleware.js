const {StatusCodes} = require('http-status-codes')
const {ErrorResponse} = require('../utils/common')
const AppError = require('../utils/errors/app-error')

function validateCreateFlight(req,res,next){
    const incommingFields = Object.keys(req.body)
     const validFields = ['flightNumber','airplaneId','departureAirportId','arrivalAirportId','arrivalTime','departureTime','boardingGate','totalSeats']
    ErrorResponse.error =  new AppError(['No data found in the incoming request'],StatusCodes.BAD_REQUEST)
    if(incommingFields.length === 0){
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    }
    ErrorResponse.error =  new AppError(['Few data is not found or not valid in the incoming request'],StatusCodes.BAD_REQUEST)
    const inValidFields = incommingFields.filter(field => !validFields.includes(field))
    if(inValidFields.length >0){
        ErrorResponse.error =  new AppError([`Invalid fields: ${inValidFields.join(', ')}`],StatusCodes.BAD_REQUEST)
       return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    }
    next()

}


module.exports = {
    validateCreateFlight
}