const React = require('react');
const ReactRouter = require('react-router');
const history = require('react-router/lib/BrowserHistory').history;
const dom = React.DOM;

const Router = React.createFactory(ReactRouter.Router);
const Route = React.createFactory(ReactRouter.Route);
const Link = React.createFactory(ReactRouter.Link);

const Item = React.createClass({
  render: function() {
    return dom.div(null, "hola, item");
  }
});

const App = React.createClass({
  render: function() {
    return dom.div(
      null,
      Link({ to: "/item?foo=bar" }, "This is an app."),
      this.props.children
    );
  }
});

React.render(
  Router(
    { history: history,
      onUpdate: function() { console.log(this.history.path); }},
    Route({ path: "/", component: App },
          Route({ path: "item", component: Item }))
  ),
  document.querySelector('#mount')
);
