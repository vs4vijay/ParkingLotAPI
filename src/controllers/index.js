'use strict';

const { HealthCheckController } = require('./health-check.controller');
const { ParkingLotsController } = require('./parking-lots.controller');
const { ParkingSpacesController } = require('./parking-spaces.controller');
const { UsersController } = require('./users.controller');

module.exports = {
  HealthCheckController,
  ParkingLotsController,
  ParkingSpacesController,
  UsersController
};
