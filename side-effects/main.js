const React = require('react');
const { createStore, combineReducers } = require('redux');
const { Provider, connect } = require('react-redux');
const reducers = require('./reducers');
const constants = require('./constants');
const dom = React.DOM;

const store = createStore(combineReducers(reducers), {});

function addItem() {
  return {
    type: constants.FETCH_ITEM
  };
}

let App = React.createClass({
  render: function() {
    return dom.div(
      null,
      dom.button({ onClick: () => this.props.dispatch(addItem()) },
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
