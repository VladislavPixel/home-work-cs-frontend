const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',

	entry: './src/index.ts',

	output: {
		path: path.resolve('dist'),
		filename: '[name].js'
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				options: {allowTsInNodeModules: true}
			}
		]
	},

	plugins: [new HtmlWebpackPlugin({template: "src/index.ejs"})],

	resolve: {
		extensions: ['.ts', '.js', '.json'],

		alias: {
			'@layer-app-demo/layer-1': path.resolve('node_modules/@layer-app-demo/layer-1/src'),
			'@layer-app-demo/layer-2': path.resolve('node_modules/@layer-app-demo/layer-2/src')
		},

		modules: [
			path.resolve('src'),
			path.resolve('node_modules/@layer-app-demo/layer-2/src'),
			path.resolve('node_modules/@layer-app-demo/layer-1/src'),
			path.resolve('node_modules')
		]
	}
}
