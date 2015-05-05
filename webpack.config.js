/* jshint node: true */
var path = require('path');


module.exports = {
  context: path.join(__dirname),
  entry: './example.js',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname),
    filename: 'react-voltron-select.js',
    libraryTarget: 'umd',
    library: 'ReactVoltronSelect'
  },

  // externals: {
  //  'react': 'var React'
  // },

  module: {
    loaders: [
      {
        test: /\.scss$/,
        // Query parameters are passed to node-sass
        loader: 'style!css!sass?outputStyle=expanded&' +
          'includePaths[]=' + (path.resolve(__dirname, './bower_components')) + '&' +
          'includePaths[]=' + (path.resolve(__dirname, './node_modules'))
      },
      {
        test: /\.jsx?$/,
        loader: 'jsx-loader?harmony'
      }
    ]
  }
};
