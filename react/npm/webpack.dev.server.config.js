var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var AppCachePlugin = require('appcache-webpack-plugin');

module.exports = {
    devtool: "cheap-eval-source-map",
    entry: [
        "webpack-dev-server/client?http://localhost:3102/",
        "webpack/hot/only-dev-server",
        path.join(__dirname, "./../src/app"),
    ],
    output: {
        path: path.join(__dirname, './../build'),
        filename: "js/bundle.js",
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                include: path.join(__dirname, './../src'),
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css/,
                loader: ExtractTextPlugin.extract("css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:10]")
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("../css/bundle.css"),
        new webpack.ProvidePlugin({
            _: 'underscore'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new AppCachePlugin()
    ],
    externals: {
        'site-config': JSON.stringify(require('./site-config.json'))
    },

    devServer: {
        publicPath: "http://127.0.0.1:3102",
        contentBase: path.join(__dirname, "./../build"),
        hot: true,
        inline: true,
        historyApiFallback: true,
        quiet: true,
    },
}
