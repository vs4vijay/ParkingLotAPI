#!/usr/bin/env node
'use strict';

const express = require('express');
const logger = require('pino')();

const config = require('./config');
const { HealthCheckController, ParkingLotsController, 
        ParkingSpacesController, UsersController } = require('./controllers');

require('./db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Root Route
app.get('/', (req, res) => {
  res.json({
    message: 'Parking Lot System is Running',
  });
});

app.get(`${config['BASE_PATH']}/healthz`, HealthCheckController.healthCheck);

// Route for Initialize Parking Log
app.post(`${config['BASE_PATH']}/parking_lots/init`, ParkingLotsController.initParkingLot);

// Generic Search API for getting all parking spaces and occupied parking spaces
app.get(`${config['BASE_PATH']}/parking_spaces`, ParkingSpacesController.search);

// Generic Search API for getting registred users
app.get(`${config['BASE_PATH']}/users`, UsersController.search);

// API to book a parking space
app.post(`${config['BASE_PATH']}/users/book`, UsersController.book);
app.post(`${config['BASE_PATH']}/users/park`, UsersController.park);
app.post(`${config['BASE_PATH']}/users/unpark`, UsersController.unpark);


// Handle 404 Routes
app.get('*', (req, res) => {
  res.status(404).json({
    message: 'Resource not found',
  });
});

// Error Handler
app.use(function(error, req, res, next) {
  logger.error(error.stack, error.message);

  const response = {
    success: false,
    errors: error.stack
  };
  res.status(500).json(response);
});

if (require.main == module) {
  app.listen(config['PORT'], () => {
    logger.info(`Service has started on port ${config['PORT']}`);
  });
}

process.on('SIGINT', function () {
  process.exit();
});

module.exports = {
  app
};
