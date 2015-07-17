[Redux](https://github.com/gaearon/redux) is great. There are a few things I want to build on top of it, however:

* Do away with differentiating smart/dumb components. Specify data
  dependencies statically at the component-level, Relay-style. Relay &
  GraphQL do all sorts of fascinating things, but one of the things I
  love best about it is that the data dependencies are just a simple
  query as a static property of the component.
** [static queries source], [demo](http://jlongster.github.io/redux-experiments/static-queries/)
** [static queries w/DataScript source], [demo](http://jlongster.github.io/redux-experiments/static-queries-datascript/)
* Use Immutable.js for a single app state
* Integrate channels for async (optimistic updates, etc)