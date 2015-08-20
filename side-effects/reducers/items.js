const { withSideEffect } = require('../redux');
const constants = require('../constants');
const ensureCompleted = require('./ensure-completed');

const initialState = {
  items: {}
};

function items(state = initialState, action) {
  switch(action.type) {
  case constants.FETCH_ITEM:
    return withSideEffect(state, dispatch => {
      const id = Math.random().toString();
      dispatch({
        type: constants.FETCHING_ITEM,
        status: 'begin',
        value: { id: id }
      });

      // Some time later, the item comes in...
      setTimeout(() => {
        dispatch({
          type: constants.FETCHING_ITEM,
          status: 'success',
          value: { id: id,
                   value: 'James' }
        });
      }, 1000);
    })
  case constants.FETCHING_ITEM:
    const id = action.value.id;
    console.log(action);

    if(action.status === 'begin') {
      return {
        items: Object.assign({}, state.items, { [id]: { value: 'Loading...'}})
      };
    }
    else if(action.status === 'success') {
      const item = action.value;
      return {
        items: Object.assign({}, state.items, { [id]: action.value })
      };
    }
  default:
    return state;
  }
}

module.exports = ensureCompleted(
  initialState,
  constants.FETCH_ITEM,
  constants.FETCHING_ITEM,
  items
);
