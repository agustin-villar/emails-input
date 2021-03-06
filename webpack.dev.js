/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',
    entry: {
        library: './src/emails-input.js',
        usage: './src/dev/usage-script.js',
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        port: 8080,
        compress: true,
        liveReload: true,
        watchContentBase: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            title: 'Emails Input Library',
            template: path.resolve(__dirname, 'public/index.html'),
        }),
    ],
    output: {
        filename: '[name].js',
    },
});
