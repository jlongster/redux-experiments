const constants = require('./constants');

function updateUserLocation(loc) {
  return {
    type: constants.UPDATE_USER_LOCATION,
    location: loc
  }
}

module.exports = { updateUserLocation };
