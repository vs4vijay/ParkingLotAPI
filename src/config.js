'use strict';

require('dotenv').config();

const config = {
  // Application configuration
  PORT: process.env.PORT || 9000,
  BASE_PATH: process.env.BASE_PATH || '/api/v1',
  TIMESTAMP: new Date().toTimeString(),

  BOOKING_WAIT_TIME: 30 * 60,

  // DB related configuration
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://root:root@localhost/test?authSource=admin&w=1'
};

module.exports = config;
