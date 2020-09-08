'use strict';

const logger = require('pino')();

const { ParkingSpaceService } = require('../services');

const parkingSpaceService = new ParkingSpaceService();

class ParkingLotController {
  constructor() {}

  // API for create default Parking Lot System
  static async initParkingLot(req, res, next) {
    logger.info(req.body);
    const parkingLotSystemName = req.body['name'] || 'default';
    const parkingLotSystemCapacity = Number(req.body['capacity'] || 120);
    const parkingLotSystemReservedPercentage = Number(req.body['reserved_percentage'] || 20);

    const parkingSpace = {
      parking_lot_name: parkingLotSystemName,
    }

    const reservedSpaces = Math.floor(parkingLotSystemCapacity * parkingLotSystemReservedPercentage / 100);

    try {
      for(let i=0; i<parkingLotSystemCapacity; i++) {
        parkingSpace['spot_no'] = i+1;

        if(i < reservedSpaces) {
          // Creating reserved
          parkingSpace['is_reserved'] = true;
        } else {
          // Creating normal parking space
          parkingSpace['is_reserved'] = false;
        }

        await parkingSpaceService.create(parkingSpace);
      }
    } catch (error) {
      logger.error(error);
      next(error);
    }

    const response = {
      message: `Parking System ${parkingLotSystemName} is created with ${reservedSpaces} reserved spaces of total ${parkingLotSystemCapacity}`,
    };
    res.status(200).json(response);
  }

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
}

module.exports = {
  ParkingLotController,
};
