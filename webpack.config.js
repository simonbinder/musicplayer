const path = require('path');

module.exports = [
  {
    target: 'web',
    entry: {
      main: './src/index.js'
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'build')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['react', 'es2015']
              }
            }
          ]
        }, {
          test: /\.scss$/,
          use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader"
            },{
            loader: "sass-loader" // compiles Sass to CSS
          }]
        }
      ]
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    }
  }
];
