'use strict';

const logger = require('pino')();

const { User, ParkingSpace } = require('../models');

const BOOKING_WAIT_TIME = 30 * 60; // in seconds

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
      // Check if user already exists in system, if not exists then create it
      const user = await User.findOneAndUpdate(
        { name },
        { name },
        { new: true, upsert: true }
      );

      logger.info(user);
      logger.info(`booking for user: ${user.name}`);

      // TODO: Check if there no booking made exists for the user. i.e. Only one booking can be active for a user

      const booking = {
        registration_no: vehicleRegistrationNo,
        booked_at: bookingTime || new Date(),
      };

      await user.updateOne({ $push: { bookings: booking } });
    } catch (error) {
      logger.error(error);
    }
  }

  async parkVehicle({ name, vehicleRegistrationNo }) {
    try {
      // Check if user already exists in system, if not exists then create it
      const user = await User.findOneAndUpdate(
        { name },
        { name },
        { new: true, upsert: true }
      );
      logger.info(user);

      // Check if booking is present for the user
      let validBookingExists = false;
      for (let booking of user.bookings) {
        console.log('booking', booking);
        console.log(
          'booking time ',
          booking.booked_at,
          new Date(booking.booked_at)
        );

        if (booking.registration_no === vehicleRegistrationNo) {
          validBookingExists = this.isValidBooking(booking);

          if (validBookingExists) {
            break;
          }
        }
      }

      if (validBookingExists) {
        console.log('validBookingExists', validBookingExists);
        // TODO:
      }

      const searchCreteria = { registration_no: null, is_reserved: false };
      const parkingSpace = await ParkingSpace.findOne(searchCreteria);
      console.log('parkingSpace', parkingSpace);

      // No Parking Space Available
      if (!parkingSpace) {
        logger.info('No parking space available in system');
        throw new Error('ParkingSpaceOverflow');
      }

      logger.info({ spot_no: parkingSpace.spot_no }, 'found parking space');

      parkingSpace.registration_no = vehicleRegistrationNo;
      return await parkingSpace.save();
    } catch (error) {
      throw error;
    }
  }

  async unparkVehicle(registrationNo) {
    const parkingSpace = await ParkingSpace.findOne({
      registration_no: registrationNo,
    });
    console.log('parkingSpace', parkingSpace);

    if (parkingSpace) {
      parkingSpace.registration_no = null;
      return await parkingSpace.save();
    } else {
      throw new Error('InvalidRegistrationNo');
    }
  }

  isValidBooking(booking) {
    let validBookingExists = false;
    const currentTime = new Date();

    // Check if booking time is still in wait limit
    if ((currentTime - booking.booked_at) / 1000 <= BOOKING_WAIT_TIME) {
      validBookingExists = true;
    }

    return validBookingExists;
  }
}

module.exports = UserService;
