/**
 * Created by Администратор on 15.07.2016.
 */
const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    BowerWebpackPlugin = require("bower-webpack-plugin"),
    SpritesmithPlugin = require('webpack-spritesmith');


module.exports = {
    entry: {
        app: './src/index',
        vendors:['webix', 'leaflet'],
        //vendors: ['jquery', 'backbone', 'bootstrap-css', 'leaflet'],
        //plugins: ['Leaflet.Geodesic'],
        "dev-server": 'webpack-dev-server/client?http://localhost:8080'
    },
    output: {
        publicPath: '/',
        path: './public',
        filename: '[name].js'
    },

    externals: {
        //"jquery": "jQuery"
    },
    resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
        alias: {}
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
            {test: /\.css$/, loader: "style?name=css/[name].[ext]'!css"},
            {test: /\.(woff2?|svg)/, loader: 'url?limit=10000&name=fonts/[name].[ext]'},
            {test: /\.(ttf|eot)/, loader: 'file?name=fonts/[name].[ext]'},
            //{test: /bootstrap-css.js/, loader: 'imports?jQuery=jquery'},
            {test: /\.(png|jpg)/, loader: "file?name=../src/images/[name].[ext]"},

        ],
    },

    plugins: [
        new webpack.OldWatchingPlugin(),
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
        }),
        // new SpritesmithPlugin({
        //     src: {
        //         cwd: './src/images',
        //         glob: '*.png'
        //     },
        //     target: {
        //         image: './public/images/sprite.png',
        //         css: './src/sprite.css'
        //     },
        //     apiOptions: {
        //         cssImageRef: "/images/sprite.png"
        //     }
        // })

    ],

    devServer: {
        contentBase: "./public",
        proxy: {
            '/api/*': {
                target: 'http://localhost:3000/',
                secure: false
            }
        }
    },
    debug: true,
    devtool: 'source-map',
};