const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');


module.exports = {
	mode: 'development',
	devtool: 'source-map',
	entry: './src/content.js',
	output: {
		filename: 'content.js',
		path: path.resolve(__dirname,'dist'),
	},
	plugins: [
	new Dotenv(),
	new CopyPlugin({
		patterns: [
			{ from: 'src/manifest.json', to: 'manifest.json'},
			{ from: 'src/content.css', to: 'content.css',noErrorOnMissing: true},
			{ from: 'node_modules/@inboxsdk/core/pageWorld.js', to: 'pageWorld.js' },
			{ from: 'node_modules/@inboxsdk/core/background.js', to: 'background.js' }
			],
		}),
	],
};