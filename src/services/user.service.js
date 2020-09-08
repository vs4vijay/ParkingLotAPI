'use strict';

const { User } = require('../models');

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
}

module.exports = UserService;
