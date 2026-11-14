const {AirportRepository} = require('../repositories')
const AppError = require('../utils/errors/app-error')
const {StatusCodes} = require('http-status-codes')
const airportRepository = new AirportRepository();

async function createAirport(data){
    try {
        const response = await airportRepository.create(data)
    return response
    } catch (error) {
        if(error.name = 'sequelizeValidationError'){
            let explanation = []
            error.errors.array.forEach(err => {
                explanation.push(err.message);
            });

           throw new AppError(explanation,StatusCodes.BAD_REQUEST)
        }
         throw new AppError('Cannot Create a new Airplane Object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
    
}

async function getAllAirport(){
    try {
        const response = await airportRepository.getAll();
        return response
    } catch (error) {
    throw new AppError('Cannot fetch data of all the airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(id){
    try {
        const response = await airportRepository.get(id);
        return response
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError('Requested Airplane is Not found',error.statusCode);
        }
    throw new AppError('Cannot fetch data of all the airplane',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function deleteAirport(id){
    try {
        const response = await airportRepository.destroy(id);
        return response
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError('Requested Airplane is Not found',error.statusCode);
        }
    throw new AppError('Cannot perform delete on airplane',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function updateAirport(id,data){
    try {
        const response = await airportRepository.update(id,data)
    return response
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError('Requested Airplane is Not found',error.statusCode);
        }

         throw new AppError('Cannot perform update on airplane',StatusCodes.INTERNAL_SERVER_ERROR);
    }
    
}

module.exports ={
    createAirport,
    getAllAirport,
    getAirport,
    deleteAirport,
    updateAirport
}