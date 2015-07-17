const React = require('react');
const { combineReducers, createStore } = require('redux');
const { Provider } = require('react-redux');
const connect = require('./connect');
const reducers = require('./reducers');
const actions = require('./actions');
const dom = React.DOM;

let App = React.createClass({
  statics: {
    localQueries: ['position', 'user.attrs.location'],
    actions: actions
  },

  render: function() {
    const actions = this.props.actions;

    return dom.div(
      { className: 'app' },
      dom.div(null,
              "x: ", this.props.position.x,
              " y: ", this.props.position.y),
      dom.button({ onClick: () => actions.moveX(10.5) },
                 "Move X"),
      dom.button({ onClick: () => actions.moveY(10.5) },
                 "Move Y"),
      dom.div(null, "User location: " + this.props.location),
      "Change it: ",
      dom.input({ onChange: e => actions.updateUserLocation(e.target.value),
                  value: this.props.location })
    );
  }
});

// "lift" it into a component that automatically binds to the app
// state according to its local queries. Normally you would do
// `module.exports = connect(App)`
App = connect(App);

const store = createStore(combineReducers(reducers), {});

React.render(
  React.createElement(Provider,
                      { store: store },
                      () => React.createElement(App)),
  document.querySelector("#mount")
);
