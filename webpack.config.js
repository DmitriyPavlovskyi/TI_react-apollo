let path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index.js'
  ],
  devServer: {
    historyApiFallback: true
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: {
          loader: 'graphql-tag/loader',
          options: {
            baseDir: path.resolve(`${__dirname}/../src/graphql`)
          }
        }
      }
    ]
  }
};
