const CrudRepository = require('./crud-repository')
const {Flight} = require('../models');
const {logger} = require('../config');
class FlightRepository extends CrudRepository{
   constructor(){
    super(Flight)
   }

   async getAllFlights(filter){
   try {
            const response = await Flight.findAll({
            where : filter
            });
            return response
        } catch (error) {
            logger.error('Something went wrong in the Crud Repo:getAll');
            throw error;
        }
   }
}

module.exports = FlightRepository;