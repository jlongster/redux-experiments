const constants = require('./constants');

function moveX(amount) {
  return {
    type: constants.MOVE_X,
    amount: amount
  };
}

function moveY(amount) {
  return {
    type: constants.MOVE_Y,
    amount: amount
  };
}

function updateUserLocation(loc) {
  return {
    type: constants.UPDATE_USER_LOCATION,
    location: loc
  }
}

module.exports = { moveX, moveY, updateUserLocation };
