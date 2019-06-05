const path = require('path');
const webpack = require('webpack');
// 自动把js插入到模板index.html
const HtmlWebpackPlugin = require('html-webpack-plugin');

commonConfig = {
    // 入口
    entry: {
        app: [
            "babel-polyfill",
            path.join(__dirname, 'src/index.js'),
        ],
        // 提取react公共库缓存
        vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
    },
    // 输出到dist文件夹，输出文件名字为bundle.js
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        publicPath: "/"
    },
    // 文件路径优化
    resolve: {
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            component: path.join(__dirname, 'src/component'),
            router: path.join(__dirname, 'src/router'),
            actions: path.join(__dirname, 'src/redux/actions'),
            reducers: path.join(__dirname, 'src/redux/reducers'),
            // redux: path.join(__dirname, 'src/redux'),
        }
    },
    // src文件夹下面的以.js结尾的文件，要使用babel解析
    // cacheDirectory是用来缓存编译结果，下次编译加速
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory=true'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            }
        ]
    },
    plugins: [
        // 修改index.html里js的引用文件名（包含hash的）
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html'),
        }),
        // 优化缓存,其他文件更改的时候，vendor.xxx.js不修改
        new webpack.optimize.SplitChunksPlugin(),
        new webpack.optimize.RuntimeChunkPlugin(),
    ],  
};

module.exports = commonConfig;