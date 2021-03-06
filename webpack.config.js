var webpack                 = require("webpack");
var ExtractTextPlugin       = require("extract-text-webpack-plugin");
var autoprefixer            = require('autoprefixer');
var autoprefixerBrowsers    = ["> 1%", "last 2 versions", "Firefox ESR", "Opera 12.1"];

module.exports = {

    entry: {
        main: __dirname + '/assets/scripts/main.js'
    },
    output: {
        path: __dirname + '/dist/',
        filename: 'plugin.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style", "css")
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css!postcss!sass')
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf)(\?[a-z0-9=\.]+)?$/,
                loader: "file?name=../fonts/[name].[ext]"
            },
            {
                test: /\.(svg|gif|png|jpeg|jpg)(\?[a-z0-9=\.]+)?$/,
                loader: "file?name=../images/[name].[ext]"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('plugin.css', {
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            compress: {
                unused: false
            }
        })
    ],
    externals: {
        "jquery": "jQuery"
    },
    postcss: function () {
        return [autoprefixer({ browsers: autoprefixerBrowsers })];
    },
    watchOptions: {
        poll: 100
    }
}