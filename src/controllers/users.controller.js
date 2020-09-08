'use strict';

const logger = require('pino')();

const { ParkingSpaceService, UserService } = require('../services');

const userService = new UserService();

class UsersController {
  constructor() {}

  // Generic Search API for Users
  static async search(req, res, next) {
    const searchCreteria = {};

    // TODO: Return only useful information

    const response = {
      data: await userService.search(searchCreteria).select('-_id name can_use_reserved_space created_at updated_at'),
    };
    res.json(response);
  }

  // Booking API
  static async book(req, res, next) {
    logger.info(req.body, 'Booking Request')

    const name = req.body.name || 'Vijay';
    const vehicleRegistrationNo = req.body.registration_no;
    const bookingTime = req.body.booking_time; // This can be used for testing the functionalities

    // TODO: reserved

    try {
      await userService.bookVehicle({ name, vehicleRegistrationNo, bookingTime });

      const response = {
        data: 'Parking Space booked successfully',
      };
      res.json(response);
    } catch (error) {
      const response = {
        error: error,
      };
      res.status(400).json(response);
    }

  }
}

module.exports = {
  UsersController,
};
