var path = require('path');
const webpack = require('webpack')

module.exports = {
    entry: "./public/main.jsx",
    output: {
        path: path.join(__dirname, 'public'),
        filename: "bundle.js",
        publicPath: '/public/'
    },
    devServer: { inline: true },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],

    module: {
        loaders: [{
                test: /\.jsx?$/,
                loader: 'react-hot',
                exclude: path.join(__dirname, 'node_modules'),

            },
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: path.join(__dirname, 'node_modules'),
                query: {
                    presets: ['stage-0', 'react', 'es2015']
                }
            },

            {
                test: /\.css$/,
                loaders: ["css-loader", "style-loader"]
            }, {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.png$/,
                loader: 'file'
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file'
            }
        ]
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, "./stylesheets")]
    }
};