'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const parkingSpaceSchema = new Schema({
  parking_lot_name: {
    type: String,
    required: true
  }, 
  spot_no: {
    type: Number,
    required: true
  },
  is_reserved: {
    type: Boolean,
    default: false
  },
  registration_no: {
    type: String,
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const ParkingSpace = mongoose.model('parking_spaces', parkingSpaceSchema);

module.exports = ParkingSpace;
