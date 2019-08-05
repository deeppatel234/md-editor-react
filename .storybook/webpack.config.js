const path = require('path');

module.exports = {
  module: {
    rules: [
      { test: /\.css$/, loader: 'style-loader!css-loader', include: path.resolve(__dirname, '../') },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, '../'),
      },
    ],
  },
};
