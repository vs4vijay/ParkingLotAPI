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
      data: await userService.search(searchCreteria),
    };
    res.json(response);
  }

  // Booking API
}

module.exports = {
  UsersController,
};
