/**
 * Created by Администратор on 15.07.2016.
 */
const path = require('path'),
    webpack = require('webpack'),
    BowerWebpackPlugin = require("bower-webpack-plugin");


module.exports = {
    entry: [
        //'babel-polyfill',
        //'./src/theme/main.less',
        './src/main',
        'webpack-dev-server/client?http://localhost:8080'
    ],
    externals:{
        "jquery": "jQuery",
        //"backbone": "Backbone"
    },
    resolve: {
        modulesDirectories: ['node_modules', 'bower_components', "ch_modules"]
    },
    output: {
        publicPath: '/',
        path: './public',
        filename: 'main.js'
    },
    debug: true,
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                exclude: ['node_modules','bower_components'],
                loader: 'babel-loader',

                query: {
                    plugins: ['transform-runtime', 'transform-decorators-legacy'],
                    presets: ['es2015', 'stage-0']
                }
            },
            {
                test: /\.less$/,
                loader: "style!css!autoprefixer!less"
            },
            {test: /\.css$/, loader: "style!css"},

        ],
    },
    plugins: [
        new webpack.OldWatchingPlugin(),
        //new BowerWebpackPlugin()
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
        )
    ],
    devServer: {
        contentBase: "./public"
    }
};