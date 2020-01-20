/*
 * @Author: ao.xia
 * @Description: 
 * @Date: 2020-01-05 22:47:50
 * @LastEditors  : ao.xia
 * @LastEditTime : 2020-01-06 00:24:24
 */
const merge = require('webpack-merge');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const baseConfig = require('./webpack.base.config.js');

module.exports = merge(baseConfig, {
    mode: 'production',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'index.[hash].css',
            hash: true,
        }),
        new CleanWebpackPlugin(),
    ]
})
