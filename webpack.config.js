const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');


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
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => {
                                return [
                                    autoprefixer('last 2 versions', 'ie 10'),
                                ]
                            }
                        }
                    },
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
            template: './src/App.html'
        }),

        new webpack.HotModuleReplacementPlugin(),
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
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => {
                                    return [
                                        autoprefixer('last 2 versions', 'ie 10')
                                    ]
                                }
                            }
                        },
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

    resolve: {
        extensions: ['.js', '.jsx', '.json', '*']
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/App.html'
        }),

        new webpack.optimize.UglifyJsPlugin(),

        new ExtractTextPlugin('application.css'),

        // new webpack.LoaderOptionsPlugin({
        //     options: {
        //         postcss: [
        //             autoprefixer(),
        //         ]
        //     }
        // })
    ]
};