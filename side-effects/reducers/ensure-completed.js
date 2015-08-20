const { withSideEffect } = require('../redux');

function ensureCompleted(initialState, fetchActionType, statusActionType, reducer) {
  // This could be more complex, of course, just keeping it simple for
  // a demo
  let queued = false;
  let fetching = false;

  return (state = initialState, action) => {
    switch(action.type) {
    case fetchActionType:
      if(fetching) {
        queued = true;
        return state;
      }
      fetching = true;
      return reducer(state, action);

    case statusActionType:
      if(action.status === 'success') {
        if(queued) {
          queued = false;
          fetching = false;
          return withSideEffect(reducer(state, action), dispatch => {
            dispatch({ type: fetchActionType });
          });
        }
        else {
          fetching = false;
        }
      }
    }

    return reducer(state, action);
  }
}

module.exports = ensureCompleted;
