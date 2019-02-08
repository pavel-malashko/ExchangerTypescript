const path = require('path');

module.exports = {
  watchOptions: {
    poll: true
  },
  entry: {
    auth: './src/auth-service/index.ts',
    chat: './src/chat-service/index.ts',
    ether: './src/ether-service/index.ts',
    msg: './src/msg-service/index.ts',
    internalApi: './src/internal-api/index.ts',
    client: './src/cli-service/index.ts',
    tst: './src/tst/index.ts',
  },
  output: {
  filename: (chunkData) => {
      return  (chunkData.chunk.name === 'client' ? '/client/': '/') + '[name].js';
    },
  path: __dirname + '/dist',

  },

  externals: [
    'pg',
    { 'sqlite3':'commonjs sqlite3'},
    'tedious',
    'pg-hstore'
  ],
  target: 'node',

  devtool: 'inline-source-map',
  module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },

  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    modules: [
      'node_modules',
    ]
  },

};
