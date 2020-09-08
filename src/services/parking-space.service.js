'use strict';

const { ParkingSpace } = require('../models');

class ParkingSpaceService {
  constructor() {}

  create(parkingSpaceBody) {
    return ParkingSpace.create(parkingSpaceBody);
  }

  get(id) {
    return ParkingSpace.findById(id);
  }

  getAll() {
    return ParkingSpace.find();
  }

  update(id, parkingSpaceBody) {
    return ParkingSpace.findByIdAndUpdate(id, parkingSpaceBody);
  }

  delete(id) {
    return ParkingSpace.findByIdAndDelete(id);
  }
}

module.exports = ParkingSpaceService;
