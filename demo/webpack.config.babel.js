import path from 'path';
import webpack from 'webpack';

const DIST_PATH = path.resolve( './dist' );
const SRC_PATH = path.resolve( './src' );

const config = {
	cache: true,
	entry: {
		site: SRC_PATH + '/demo.js'
	},
	output: {
		path: DIST_PATH,
		filename: '[name].min.js',
	},
	resolve: {
		modules: ['node_modules'],
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [{
					loader: 'babel-loader',
					options: {
						babelrc: true,
					}
				}]
			}
		]
	},
	mode: 'production',
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
	],
	stats: {
		colors: true
	},
};

module.exports = config;