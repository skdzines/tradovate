const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	context: path.resolve(__dirname, './src'),
	entry: {bundle: './index.js'},
	resolve: {
		modules: [
			path.resolve(__dirname, 'node_modules'),
			path.resolve(__dirname, './src'),
		],
		extensions: [ '.tsx', '.ts', '.jsx', '.js' ],
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, {
			test: /\.scss$/,
			use: ['style-loader', 'css-loader', 'sass-loader']
		}, {
			test: /\.(mov|mp4|mkv)$/,
			use: ['file-loader?name=video/[name].[ext]']
		}, {
			test: /\.(png|svg|jpg|gif)$/,
			use: ['file-loader?name=images/[name].[ext]']
		}, {
			test: /\.(woff|woff2|eot|[ot]tf)$/,
			use: ['file-loader?name=fonts/[name].[ext]']
		}]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new MiniCssExtractPlugin({
			filename: "css/styles.css",
			chunkFilename: "[name].[id].css"
		}),
		new HtmlWebpackPlugin({
			inject: true,
			template: 'templates/index.html',
			// favicon: 'favicon.ico'
		})
	],
	output: {
		filename: 'js/[name].js',
		path: path.resolve(__dirname, '/dist'),
		publicPath: '/'
	}
};
