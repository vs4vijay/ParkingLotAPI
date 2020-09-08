'use strict';

const mongoose = require('mongoose');
const logger = require('pino')();

const config = require('./config');

mongoose.connect(config['MONGODB_URI'], {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (error) => {
  logger.error(error);
});

db.once('open', () => {
  logger.info('connected to mongodb');
});

module.exports = {
  db
};
