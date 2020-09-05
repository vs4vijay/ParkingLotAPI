#!/usr/bin/env node
'use strict';

const express = require('express');
const logger = require('pino')();

const config = require('./config');


const app = express();

app.use(express.json());


// Root Route
app.get('/', (req, res) => {
  res.json({
    message: 'Parking Lot System is Running',
  });
});

// Handle 404 Routes
app.get('*', (req, res) => {
  res.status(404).json({
    message: 'Resource not found',
  });
});

if (require.main == module) {
  app.listen(config.PORT, () => {
    logger.info(`Service has started on port ${config['PORT']}`);
  });
}

process.on('SIGINT', function () {
  process.exit();
});
