const { AirportServices } = require('../services')
const { StatusCodes } = require('http-status-codes')
const { ErrorResponse } = require('../utils/common')
const { SuccessResponse } = require('../utils/common')

async function createAirport(req, res) {
    const data = req.body
    try {
        const response = await AirportServices.createAirport(data)
        SuccessResponse.data = response;
        SuccessResponse.message = 'Successfully created Airport'
        return res.status(StatusCodes.CREATED).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = 'Something went wrong while creating Airport'
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

async function getAllAirport(req, res) {
    try {
        const response = await AirportServices.getAllAirport()
        SuccessResponse.data = response;
        SuccessResponse.message = 'Successfully fetched all the Airports'
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = 'Something went wrong while fetching Airports'
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

async function getAirport(req, res) {
    try {
        const response = await AirportServices.getAirport(req.params.id)
        SuccessResponse.data = response;
        SuccessResponse.message = 'Successfully fetched the Airport'
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = 'Something went wrong while fetching Airport'
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

async function deleteAirport(req, res) {
    try {
        const response = await AirportServices.deleteAirport(req.params.id)
        SuccessResponse.data = response;
        SuccessResponse.message = 'Successfully deleted the Airport'
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = 'Something went wrong while deleting the Airport'
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

async function updateAirport(req, res) {
    try {
        let id = req.params.id;
        let data = req.body
        const response = await AirportServices.updateAirport(id, data)
        SuccessResponse.data = response;
        SuccessResponse.message = 'Successfully updated the Airport'
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = 'Something went wrong while updating the Airport'
        return res.status(error.statusCode).json(ErrorResponse)
    }
}
module.exports = {
    createAirport,
    getAllAirport,
    getAirport,
    deleteAirport,
    updateAirport
}