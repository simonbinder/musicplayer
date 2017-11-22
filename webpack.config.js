const path = require('path');

module.exports = [
  {
    target: 'web',
    entry: {
      main: './src/index.js',
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'build'),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['react', 'es2015'],
              },
            },
          ],
        },
      ],
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  },
];
