/*
 * @Author: ao.xia 
 * @Date: 2020-01-07 00:01:02 
 * @Last Modified by: ao.xia
 * @Last Modified time: 2020-01-08 00:03:15
 */
const merge = require('webpack-merge');
const webpack = require('webpack');

const baseConfig = require('./webpack.base.config.js');

module.exports = merge(baseConfig, {
    mode: 'development',
    devServer: {
        hot: true,
        port: 8080,
        // open: true,
    },
    devtool: 'cheap-eval-source-map',
    watch: true,
    watchOptions: {
        aggregateTimeout: 500,
        ignored: /node_moudles/,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ]
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),

    ]
})
