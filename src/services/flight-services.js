const {FlightRepository} = require('../repositories')
const AppError = require('../utils/errors/app-error')
const {StatusCodes} = require('http-status-codes')
const flightRepository = new FlightRepository();
const {compareTime} = require('../utils/helper/helper')
const {Op} = require('sequelize')

async function createFlight(data){
    try {
        if(compareTime(data.arrivalTime, data.departureTime)){
            const response = await flightRepository.create(data)
    return response
        }else{
            throw new AppError('Arrival time must be greater then departure time',StatusCodes.BAD_REQUEST)
        }
        
    } catch (error) {
        if(error.name == 'sequelizeValidationError'){
            let explanation = []
            error.errors.forEach(err => {
                explanation.push(err.message);
            });

           throw new AppError(explanation,StatusCodes.BAD_REQUEST)
        }
         throw new AppError('Cannot Create a new Airplane Object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
    
}

async function getAllFlights(query) {
    let customFilter = {};


    if (query.trips) {
        const [departureAirportId, arrivalAirportId] = query.trips.split("-");

        if (!departureAirportId || !arrivalAirportId) {
            throw new AppError(
                'Invalid trip format. Use MAA-BLR',
                StatusCodes.BAD_REQUEST
            );
        }

        if (departureAirportId === arrivalAirportId) {
            throw new AppError(
                'Departure and Arrival airport is same',
                StatusCodes.BAD_REQUEST
            );
        }

        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }

    if(query.price){
        [minPrice,maxPrice] = query.price.split("-");

        customFilter.price = {
            [Op.between] : [minPrice,(maxPrice == undefined ? 2000 : maxPrice)]
        }
    }

    try {
        const response = await flightRepository.getAllFlights(customFilter);
        return response;
    } catch (error) {
    

        throw new AppError(
            'Cannot fetch data of the Flights',
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}


module.exports ={
    createFlight,
    getAllFlights
}