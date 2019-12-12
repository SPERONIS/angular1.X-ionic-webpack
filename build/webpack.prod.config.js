var baseconf = require('./webapck.base.config');
var path = require('path');
var root = path.resolve(__dirname, '../');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify("development")
        }
    }),
    // new webpack.optimize.UglifyJsPlugin({    此插件打包后会报错  Error: [$injector:unpr] Unknown provider: e 待解决
    //     compress: {
    //         warnings: false
    //     }
    // }),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true
    }),
    new ExtractTextPlugin({
        filename: './css/[name].css?[contenthash:8]',
        allChunks: true,
    }),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        'window.$': 'jquery',
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'commons', // 这公共代码的chunk名为'commons'
        filename: './js/[name].bundle.js', // 生成后的文件名
        minChunks: 3,
    }),
    new ManifestPlugin(path.join('dist', 'manifest.json'))
];

module.exports = merge(baseconf, {
    output: {
        path: root + "/dist",
        publicPath: "./",
        filename: "./js/[name].[chunkhash].js"
    },
    devtool: false,
    plugins: plugins
});