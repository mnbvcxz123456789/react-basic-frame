const merge = require('webpack-merge');
const webpack = require('webpack');
// 压缩生成的文件
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// 每次打包清理dist
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// css单独打包
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const commonConfig = require('./webpack.common.config');

const publicConfig = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    // src文件夹下面的以.js结尾的文件，要使用babel解析
    // cacheDirectory是用来缓存编译结果，下次编译加速
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "postcss-loader"]
                }),
            },
        ]
    },
    plugins: [
        // 每次打包清理test
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!api', '!api/user.json'],
        }),
        // 压缩生成的文件
        new UglifyJSPlugin(),
        // 指定环境
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        // 单独打包css
        new ExtractTextPlugin({
            filename: '[name].[hash:5].css',
            allChunks: true,
        }),
    ],
};

module.exports = merge(commonConfig, publicConfig);