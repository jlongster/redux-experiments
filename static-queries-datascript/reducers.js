const constants = require('./constants');
const ds = require('datascript');

// Not so much a bunch of reducers anymore, just a single one that
// operates on the db. You could still easily separate this out in to
// smaller action handlers though and still combine them into a single
// reducer.
function handler(db, action) {
  switch(action.type) {
  case constants.UPDATE_USER_LOCATION:
    return ds.db_with(
      db,
      [[":db/add", 1, "location", action.location]]
    );
  default:
    return db;
  }
}

module.exports = handler;
