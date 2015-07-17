const constants = require('./constants');
const mergeObj = require('./util/mergeObj');

function position(state = { x: 0, y: 0 }, action) {
  switch(action.type) {
  case constants.MOVE_X:
    return { x: state.x + action.amount, y: state.y };
  case constants.MOVE_Y:
    return { x: state.x, y: state.y + action.amount };
  default:
    return state;
  }
}

const initialUser = {
  name: "James",
  attrs: {
    height: 6,
    location: "Richmond"
  }
}

function user(state = initialUser, action) {
  switch(action.type) {
  case constants.UPDATE_USER_LOCATION:
    // Using immutable.js would be the best :)
    return mergeObj(state, {
      attrs: mergeObj(state.attrs, {
        location: action.location
      })
    });
  default:
    return state;
  }
}

module.exports = { position, user };
