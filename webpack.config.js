
module.exports = {
  entry: {
    'static-queries': ['./static-queries/main.js'],
    'static-queries-datascript': ['./static-queries-datascript/main.js'],
    'routes': ['./routes/main.js'],
    'transit': ['./transit/main.js'],
    'side-effects': ['./side-effects/main.js']
  },
  output: { filename: './[name]/build/build.js' },
  module: {
    loaders: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel'] }
    ]
  },
  devtool: '#source-map'
};

// ?optional=runtime&stage=1
