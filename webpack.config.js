var path = require('path');
var webpack = require('webpack')

module.exports = {
    /* Generate source-maps for browser side debugging */
    devtool: "source-map",

    /* Entry file to start building from. This is where you will want to start
     * your project.  If you wanted to build multiple entry points you could
     * list them below.
     */
    entry: {
        main: "./src/main.jsx"
    },

    /* Defines where to output the final built files. The [name] definition
     * is based off of the entry point's name. This example will generate
     * a main.bundle.js in the public/build directory.
     */
    output: {
        path: path.resolve(__dirname, "public/build"),
        filename: "[name].bundle.js",
        publicPath: "/public/build/",
    },

    resolve: {
        /* Defines where it can load modules from. Since we've installed our
         * JS dependencies through npm, it can look in the node_modules
         * directory. If you use bower, you can add 'bower_components'
         * to the list.
         */
        modulesDirectories: ['node_modules'],
        /* List extensions to load in require() statements. The '' entry
         * is needed to allow you to require src/main.jsx as require('src/main.jsx')
         */
        extensions: ['', '.js', '.jsx']
    },

    /* Defines what modules to use */
    module: {
        loaders: [{
                test: /\.jsx$/,
                loader: "jsx-loader"
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
        includePaths: [path.resolve(__dirname, "src/stylesheets")]
    },

    // historyApiFallback: {
    //     rewrites: [
    //         { from: /\./, to: '/' }
    //     ]
    // },

    devServer: {
        historyApiFallback: {
            index: '/public/'
        },
        inline: true,
        progress: true,

    }
};