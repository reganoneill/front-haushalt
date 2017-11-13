const path = require('path');
const webpack = require('webpack');

require('dotenv').config();

module.exports = {
	context: __dirname,
	entry: [
		'react-hot-loader/patch',
		'webpack-dev-server/client?http://localhost:8081',
		'webpack/hot/only-dev-server',
		'./src/components/ClientApp.jsx',
	],
	devtool: 'cheap-eval-source-map',
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js',
		publicPath: '/public/',
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json'],
	},
	stats: {
		colors: true,
		reasons: true,
		chunks: true,
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.jsx?$/,
				loader: 'eslint-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			_BACKEND_: JSON.stringify(process.env.BACKEND),
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
	],
	devServer: {
		hot: true,
		publicPath: '/public/',
		historyApiFallback: true,
	},
};
