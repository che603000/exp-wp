/**
 * Created by Администратор on 15.07.2016.
 */
const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    BowerWebpackPlugin = require("bower-webpack-plugin");


module.exports = {
    entry: {
        app: './src/main',
        vendors: ['jquery', 'backbone','bootstrap-css'],
        "dev-server": 'webpack-dev-server/client?http://localhost:8080'
    },
    output: {
        publicPath: './',
        path: './public',
        filename: '[name].js'
    },

    externals: {
        //"jquery": "jQuery"
    },
    resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
        alias:{

        }
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                exclude: /node_modules|bower_components/,
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
            { test: /\.(woff2?|svg)$/, loader: 'url?limit=10000' },
            { test: /\.(ttf|eot)$/, loader: 'file' },
            { test: /bootstrap-css.js/, loader: 'imports?jQuery=jquery' },
        ],
    },

    plugins: [
        new webpack.OldWatchingPlugin(),
        //new BowerWebpackPlugin()
        new BowerWebpackPlugin({
            modulesDirectories: ["bower_components"],
            manifestFiles: ".bower.json",
            includes: /.*/,
            excludes: [],
            searchResolveModulesDirectories: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendors",
            //filename: "index.js",
            minChunks: Infinity,
        }),
        new HtmlWebpackPlugin({
            title: 'My App',
            filename: 'index.html',
            template: './src/index.html'
        })

    ],

    devServer: {
        contentBase: "./public"
    },
    //debug: true,
   // devtool: 'source-map',
};