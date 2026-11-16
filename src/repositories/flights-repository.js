const CrudRepository = require('./crud-repository')
const {Flight,Airplane,Airport, Sequelize} = require('../models');
const {logger} = require('../config');
class FlightRepository extends CrudRepository{
   constructor(){
    super(Flight)
   }

   async getAllFlights(filter, sort) {
  try {
    return await Flight.findAll({
      where: filter,
      order: sort,
      include: [
        { model: Airplane, required: true },
        { model: Airport, as: 'departureAirport', required: true },
        { model: Airport, as: 'arrivalAirport', required: true }
      ]
    });
  } catch (error) {
  logger.error('Something went wrong in the Crud Repo: getAll', {
    message: error.message,
    sql: error.sql,
    original: error.original?.message
  });
  throw error;
}
}
}

module.exports = FlightRepository;