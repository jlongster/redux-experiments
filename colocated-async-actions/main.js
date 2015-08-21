const React = require('react');
const redux = require('redux');
const reduxThunk = require('redux-thunk');
const { Provider, connect } = require('react-redux');
const combineReducers = require('./combineReducers');
const reducers = require('./reducers');
const constants = require('./constants');
const items = reducers.items;
const dom = React.DOM;

const createStore = redux.compose(
  redux.applyMiddleware(reduxThunk),
  redux.createStore
);

const store = createStore(combineReducers(reducers), {});

let App = React.createClass({
  render: function() {
    return dom.div(
      null,
      dom.button({ onClick: () => this.props.dispatch(items.actions.fetchItem()) },
                 'Add!'),
      dom.ul(
        null,
        Object.keys(this.props.items).map(id => {
          return dom.li(null, this.props.items[id].value);
        })
      )
    );
  }
});

App = connect(
  state => ({ items: state.items.items })
)(App);

React.render(
  React.createElement(Provider,
                      { store: store },
                      () => React.createElement(App)),
  document.querySelector("#mount")
);
