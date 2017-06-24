const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = env => {
    if (env === 'production') {
        return PROD;
    }
    if (env === 'development') {
        return DEV;
    }
}


const DEV = {
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
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]--[hash:base64:5]'
                        }
                    },
                    //'postcss-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: ['file-loader']
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

const PROD = {
    entry: './src/App.jsx',

    output: {
        filename: 'application.js',
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
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        //'postcss-loader',
                        'stylus-loader',
                    ],
                }),
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: ['file-loader']
            }
        ]
    },

    devtool: 'sourse-map',

    resolve: {
        extensions: ['.js', '.jsx', '.json', '*']
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/app.html'
        }),

        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('application.css')
    ]
}