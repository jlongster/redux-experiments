function pick(obj, fn) {
  return Object.keys(obj).reduce((result, key) => {
    if (fn(obj[key])) {
      result[key] = obj[key];
    }
    return result;
  }, {});
}

function mapValues(obj, fn) {
  return Object.keys(obj).reduce((result, key) => {
    result[key] = fn(obj[key], key);
    return result;
  }, {});
}

function combineReducers(obj) {
  const reducers = pick(mapValues(obj, value => {
    if(value && typeof value.update === 'function') {
      return value.update;
    }
    else if(typeof value === 'function') {
      return value;
    }
    return null;
  }), val => val);

  const defaultState = mapValues(reducers, () => undefined);

  return function combination(state = defaultState, action) {
    const newState = mapValues(reducers, (reducer, key) => {
      return reducer(state[key], action);
    });
    return newState;
  }
}

module.exports = combineReducers;
