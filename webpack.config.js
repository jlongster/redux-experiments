
module.exports = {
  entry: {
    'static-queries': ['./static-queries/main.js']
  },
  output: { filename: './[name]/build/build.js' },
  module: {
    loaders: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel?optional=runtime&stage=1'] }
    ]
  }
};
