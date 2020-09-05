'use strict';

require('dotenv').config();

const config = {
  // Application configuration
  PORT:       process.env.PORT || 9000,
  BASE_PATH:  '/api/v1',
  TIMESTAMP:  new Date().toTimeString(),
};


module.exports = config;
