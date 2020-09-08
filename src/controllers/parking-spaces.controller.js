'use strict';

const logger = require('pino')();

const { ParkingSpaceService } = require('../services');

const parkingSpaceService = new ParkingSpaceService();

class ParkingSpacesController {
  constructor() {}

  // Generic Search API
  static async search(req, res, next) {
    const searchCreteria = {};
    if(req.query.filter_by && req.query.filter_by == 'occupied') {
      searchCreteria['registration_no'] = { '$exists': true, '$ne': null };
    }

    const response = {
      data: await parkingSpaceService.search(searchCreteria)
                                     .select('-_id parking_lot_name spot_no registration_no is_reserved created_at updated_at'),
    };
    res.json(response);
  }
}

module.exports = {
  ParkingSpacesController,
};
