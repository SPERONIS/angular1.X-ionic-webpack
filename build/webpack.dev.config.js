var baseconf = require('./webapck.base.config');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
var root = path.resolve(__dirname, '../');


var server = {
    contentBase:'/dist/',
    host: 'localhost',//服务主机
    port: 8080,//端口
    inline: true, // 可以监控js变化
    hot: true, // 热启动
    compress: true,
    watchContentBase: true,
    proxy: {//设置代理服务器，用于调试接口
        '/api':{
            target:'http://www.baidu.com',
            pathRewrite:{"^/api": "/api"}//重写路径
        }
    }
};


var plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify("development")
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        'window.$': 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor', // 这公共代码的chunk名为'commons'
        filename: '[name].bundle.js', // 生成后的文件名，虽说用了[name]，但实际上就是'commons.bundle.js'了
        minChunks: 3, // 设定要有4个chunk（即4个页面）加载的js模块才会被纳入公共代码。这数目自己考虑吧，我认为3-5比较合适。
    }),
    new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
    }),
    new webpack.HotModuleReplacementPlugin()
];
baseconf.module.rules.push(
    {
        test: /\.css$/,
        loader: ['style-loader','css-loader'],
    }
);
module.exports = merge(baseconf, {
    output: {
        path: root+"/dist",
        publicPath: "/",
        filename: "./js/[name].[chunkhash].js"
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: server,
    plugins: plugins,
});