const React = require('react');
const { createStore } = require('redux');
const { Provider } = require('react-redux');
const connect = require('./connect');
const actions = require('./actions');
const reducers = require('./reducers');
const ds = require('datascript');
const dom = React.DOM;

// Specify a static DataScript query, and `this.props.location` is
// automatically bound! And this component is automatically rerendered
// when it changes!
let App = React.createClass({
  statics: {
    localQueries: {
      location: '[:find ?l :where [?e "name" "James"] [?e "location" ?l]]'
    },
    actions: actions
  },

  render: function() {
    const actions = this.props.actions;

    return dom.div(
      { className: 'app' },
      dom.div(null, "User location: " + this.props.location),
      'Change it: ',
      dom.input({ onChange: e => actions.updateUserLocation(e.target.value),
                  value: this.props.location })
    );
  }
});

App = connect(App);

// Create a basic DataScript database
const db = ds.db_with(
  ds.empty_db(),
  [[":db/add", 1, "name", "James"],
   [":db/add", 1, "height", 6],
   [":db/add", 1, "location", "Richmond"]]
)
const store = createStore(reducers, db);

React.render(
  React.createElement(Provider,
                      { store: store },
                      () => React.createElement(App)),
  document.querySelector("#mount")
);
