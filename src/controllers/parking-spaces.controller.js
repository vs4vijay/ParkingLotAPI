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
      searchCreteria['vehicle_id'] = { '$exists': true, '$ne': null };
    }

    const response = {
      data: await parkingSpaceService.search(searchCreteria),
    };
    res.json(response);
  }

  // Park API

  // Leave API
}

module.exports = {
  ParkingSpacesController,
};
