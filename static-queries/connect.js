const React = require('react');
const { PropTypes } = React;
const { bindActionCreators } = require('redux');
const mergeObj = require('./util/mergeObj');

const storeShape = PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired
});

function connect(component) {
  return React.createClass({
    statics: {
      dumb: component
    },

    contextTypes: {
      store: storeShape.isRequired
    },

    getInitialState: function() {
      const store = this.context.store;

      return {
        actions: component.actions ?
          { actions: bindActionCreators(component.actions, store.dispatch) } :
          null,
        namedActions: component.namedActions ?
          bindActionCreators(component.namedActions, store.dispatch) :
          null,
        queryResults: this.queryState()
      };
    },

    componentDidMount: function() {
      this.unsubscribe = this.context.store.subscribe(this.handleChange);
    },

    componentWillUnmount: function() {
      this.unsubscribe();
    },

    handleChange: function() {
      const results = this.queryState();
      const changed = Object.keys(this.state.queryResults).some(k => {
        return results[k] !== this.state.queryResults[k];
      });

      if(changed) {
        this.setState({ queryResults: results });
      }
    },

    queryState: function() {
      if(component.localQueries) {
        const state = this.context.store.getState();
        const queries = {};
        component.localQueries.forEach(query => {
          const parts = query.split('.');
          const boundName = parts[parts.length-1];

          queries[boundName] = parts.reduce((acc, k) => acc[k], state);
        });
        return queries;
      }

      return null;
    },

    render: function() {
      return React.createElement(component, mergeObj(
        this.props,
        this.state.actions || {},
        this.state.namedActions || {},
        this.state.queryResults || {}
      ));
    }
  });
}

module.exports = connect;
