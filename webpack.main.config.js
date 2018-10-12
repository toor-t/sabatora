const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.base.config');

module.exports = merge.smart(baseConfig, {
	target: 'electron-main',
	entry: {
		main: './src/main.ts'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				include: [
					path.resolve(__dirname, 'src', 'main.ts'),
					path.resolve(__dirname, 'src', 'db.ts'),
					path.resolve(__dirname, 'src', 'db_main.ts'),
					path.resolve(__dirname, 'src', 'file_io.ts'),
					path.resolve(__dirname, 'src', 'file_io_main.ts'),
					path.resolve(__dirname, 'src', 'print.ts'),
					path.resolve(__dirname, 'src', 'print_main.ts'),
				],
				loader: 'awesome-typescript-loader'
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
		})
	]
});