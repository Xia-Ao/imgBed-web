/*
 * @Author: ao.xia
 * @Description: 
 * @Date: 2020-01-05 22:47:31
 * @LastEditors  : ao.xia
 * @LastEditTime : 2020-01-06 00:47:29
 */
const fs = require('fs');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const resolve = (dir) => path.join(__dirname, '..', dir);

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'main.[hash:8].js',
        path: resolve('dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: resolve('src'),
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                        ],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", {"legacy": true}],
                            ["@babel/plugin-proposal-class-properties", {"loose": true}],
                            ["@babel/plugin-transform-runtime"],
                        ]
                    }
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10 * 1024,
                        outputPath: 'img/', // 输出到一个文件夹中
                    }
                }
            },
            {
                test: /\.vue$/,
                use: [
                    'vue-loader',
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html',
            hash: true,
        }),
        new VueLoaderPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.json', '.vue', '.less'],
        alias: {
            '@': resolve('src'),
            'vue': 'vue/dist/vue.esm',
        },
    }
};
