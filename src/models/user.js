'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  can_use_reserved_space: {
    type: Boolean,
    default: false
  },
  reason_for_reserve: {
    type: String
  },
  vehicles: [],
  bookings: []
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('users', userSchema);

module.exports = User;
