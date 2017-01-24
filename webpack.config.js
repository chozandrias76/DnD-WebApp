var path = require('path');

module.exports = {
    entry: "./public/main.jsx",
    output: {
        path: path.join(__dirname, 'public'),
        filename: "bundle.js",
        publicPath: '/public/'
    },
    devServer: { inline: true },
    module: {
        loaders: [{
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.css$/,
                loaders: ["css-loader", "style-loader"]
            }, {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, "./stylesheets")]
    }
};