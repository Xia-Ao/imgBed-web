/*
 * @Author: ao.xia
 * @Description: 
 * @Date: 2020-01-05 22:47:31
 * @LastEditors  : ao.xia
 * @LastEditTime : 2020-01-06 00:47:29
 */
const path = require('path');
const process = require('process');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const resolve = (dir) => path.join(__dirname, '..', dir);
const prodMode = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './src/main.ts',
    output: {
        filename: 'main.[hash:8].js',
        path: resolve('dist'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: resolve('src'),
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        // 相关配置详见.babelrc文件
                    }, 
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/]
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            loaders: {
                                'less': 'vue-style-loader!css-loader!less-loader',
                            }
                        }
                    },
                ]
            },
            {
                test: /\.css$/,
                use: [
                    prodMode ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [
                    prodMode ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ]
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
        extensions: ['.ts', '.js', '.vue', '.json', '.less'],
        alias: {
            '@': resolve('src'),
            'vue': 'vue/dist/vue.esm',
        },
    }
};
