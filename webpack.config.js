const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = env => {
    if (env === 'production') {
        return PROD;
    } 
    if (env === 'development') {
        return DEV;
    }
}


DEV = {
    entry: './src/App.jsx',

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                use: [
                    'babel-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.styl$/,
                use: [ 'style-loader', 'css-loader', 'stylus-loader']
            }
        ]
    },

    devtool: 'cheap-eval-source-map',

    resolve: {
        extensions: ['.js', '.jsx', '.json', '*']
    },

    devServer: {
        host: 'localhost',
        port: 3000,
        contentBase: './public',
        hot: true
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/app.html'
        }),

        new webpack.HotModuleReplacementPlugin()
    ]
};