const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
const path = require('path')
module.exports = {
	publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
	productionSourceMap: false,
	outputDir: 'dist',
	lintOnSave: false,
	css: {
		loaderOptions: {
			postcss: {
				// 这是rem适配的配置  注意： remUnit在这里要根据lib-flexible的规则来配制，如果您的设计稿是750px的，用75就刚刚好。
				plugins: [
					require('postcss-px2rem')({
						remUnit: 75
					})
				]
			}
		}
	},
	configureWebpack: {
		plugins: [
			new SkeletonWebpackPlugin({
				webpackConfig: {
					entry: {
						app: path.join(__dirname, './src/skeleton.js')
					}
				},
				minimize: true,
				quiet: true
			})
		]
	}
}
