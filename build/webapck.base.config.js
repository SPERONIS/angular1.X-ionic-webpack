var path = require('path');
var root = path.resolve(__dirname, '../');

module.exports = {
    entry: {
        main: root + '\\src\\main.js',
        jquery:['jquery'],
        ionic: root + '\\src\\ionic\\js\\ionic.bundle.js'
    },
    // optimization: {
    //     minimize: true,
    //     splitChunks: {
    //         chunks: 'async',
    //         minSize: 30000,
    //         maxSize: 0,
    //         minChunks: 1,
    //         maxAsyncRequests: 6,
    //         maxInitialRequests: 4,
    //         automaticNameDelimiter: '~',
    //         automaticNameMaxLength: 30,
    //         cacheGroups: {
    //           vendors: {
    //             test: /[\\/]node_modules[\\/]/,
    //             priority: -10
    //           },
    //           default: {
    //             minChunks: 2,
    //             priority: -20,
    //             reuseExistingChunk: true
    //           }
    //         }
    //     }
    // },
    module: {
        rules: [
            {
                test: /\.(pe?g|gif|woff|svg|eot|ttf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 8192,
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                loader: ['style-loader','css-loader'],
            },
            {
                test: /\.png$/,
                loader: ['file-loader'],
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json']
    }

};