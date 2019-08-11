const path = require('path');
const _ = require('lodash');
process.env.NODE_ENV = 'development';
const devConfig = require('react-scripts/config/webpack.config')('development');

const customConfig = {
  "entry": ['react-hot-loader/patch', "src/index.js"],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  devServer: {
    contentBase: __dirname + '/public',
    host: '0.0.0.0'
  }
};

module.exports = _.merge({}, customConfig, devConfig);

