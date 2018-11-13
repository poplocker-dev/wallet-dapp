const webpack = require('webpack');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const config = {
  entry: {
    main: './dapp/wallet.jsx'
  },
  output: {
    path: __dirname + '/build',
    filename: "bundle.js"
  },
	module: {
		rules: [
			{
				test: /\.css$/,
				include: __dirname + 'app',
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' }
				]
			},
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        include: __dirname + '/dapp',
        use: {
          loader: 'babel-loader'
        }
      }
		]
  },
	resolve: {
		extensions: ['.js', '.jsx'],
    alias: {
      lib: __dirname + '/lib'
    },
    plugins: [
      new DirectoryNamedWebpackPlugin({
        exclude: /node_modules/,
        include: [
          __dirname + '/dapp/',
          __dirname + '/lib/'
        ]
      }),
    ]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'PopWallet'
    }),
    new Dotenv()
	]
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'source-map';
  }
  return config;
};
