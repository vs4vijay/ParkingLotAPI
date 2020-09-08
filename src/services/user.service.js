'use strict';

const logger = require('pino')();

const { User, ParkingSpace } = require('../models');

class UserService {
  constructor() {}

  create(userBody) {
    return User.create(userBody);
  }

  get(id) {
    return User.findById(id);
  }

  search(searchCreteria = {}) {
    return User.find(searchCreteria);
  }

  update(id, userBody) {
    return User.findByIdAndUpdate(id, userBody);
  }

  delete(id) {
    return User.findByIdAndDelete(id);
  }

  async bookVehicle({ name, vehicleRegistrationNo, bookingTime }) {

    // TODO: Check if booking can be made at all

    try {
      // Check if user already exists in system, ir not exists then create it
      const user = await User.findOneAndUpdate({ name }, { name }, { new: true, upsert: true });

      logger.info(user);
      logger.info(`booking for user: ${user.name}`);

      // TODO: Check if there no booking made exists for the user. i.e. Only one booking can be active for a user

      const booking = {
        registration_no: vehicleRegistrationNo,
        booked_at: bookingTime || new Date()
      }

      await user.updateOne({ '$push': { 'bookings': booking } });
    } catch (error) {
      logger.error(error);
    }
  }
}

module.exports = UserService;
