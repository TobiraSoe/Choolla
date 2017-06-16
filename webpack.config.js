const path = require('path');
const webpack = require('webpack');

const DEV = {
    entry: [
        './src/entry',
        // the entry point of app
    ],

    output: {
        filename: 'bundle.js',
        // the output bundle

        path: path.resolve(__dirname, 'public'),

        publicPath: '/'
        // necessary for HMR to know where to load the hot update chunks
    },

    devtool: 'inline-source-map',

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    'babel-loader',
                ],
                exclude: /node_modules/,
                //loader for react jsx files
            },
        ],
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally

        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates

        new webpack.NoEmitOnErrorsPlugin(),
        // do not emit compiled assets that include errors
    ],

    devServer: {
        host: 'localhost',
        port: 3000,
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true,
        // respond to 404s with index.html

        hot: true,
        // enable HMR on the server
    },
};

const PROD = {
    entry: './src/intro',

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },

    //devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    'babel-loader'
                ],
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            comments: false
        })
    ]
};

module.exports = env => {
    if (env === 'production') {
        return PROD;
    } 
    if (env === 'development') {
        return DEV;
    }
}