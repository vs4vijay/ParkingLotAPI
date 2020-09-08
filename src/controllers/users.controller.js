'use strict';

const logger = require('pino')();

const { ParkingSpaceService, UserService } = require('../services');

const userService = new UserService();

class UsersController {
  constructor() {}

  // Generic Search API for Users
  static async search(req, res, next) {
    const searchCreteria = {};

    const response = {
      data: await userService.search(searchCreteria)
                             .select('-_id name can_use_reserved_space created_at updated_at'),
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

  // Park API
  static async park(req, res, next) {
    logger.info(req.body, 'Park Request')

    const name = req.body.name || 'Vijay';
    const vehicleRegistrationNo = req.body.registration_no;
    // TODO: handle for reserved

    try {
      const parkingSpace = await userService.parkVehicle({ name, vehicleRegistrationNo });

      const response = {
        spot_no: parkingSpace.spot_no,
        data: `Vehicle parked successfully at spot ${parkingSpace.spot_no}`,
      };
      res.json(response);
    } catch (error) {
      logger.error(error);

      const response = {
        error: error.message,
      };
      res.status(400).json(response);
    }

  }

  // Unpark API
  static async unpark(req, res, next) {
    logger.info(req.body, 'Unpark Request')

    const vehicleRegistrationNo = req.body.registration_no;

    try {
      await userService.unparkVehicle(vehicleRegistrationNo);

      const response = {
        data: `Vehicle unparked successfully`,
      };
      res.json(response);
    } catch (error) {
      logger.error(error);

      const response = {
        error: error.message,
      };
      res.status(500).json(response);
    }

  }
}

module.exports = {
  UsersController,
};
