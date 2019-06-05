const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const commonConfig = require('./webpack.common.config');

const devConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
    // 入口
    entry: {
    //Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。 
    // 举例来说，ES6在Array对象上新增了Array.from方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片。
        app: [
            'babel-polyfill',
            path.join(__dirname, 'src/index.js'),
        ],
    },
    // 输出到dist文件夹，输出文件名字为bundle.js
    output: {
        filename: '[name].[hash].js',
    },
    // 增加webpack-dev-server的配置
    // color（CLI only） console中打印彩色日志
    // historyApiFallback 任意的404响应都被替代为index.html。有什么用呢？你现在运行npm start，然后打开浏览器，访问http://localhost:8080,然后点击Page1到链接http://localhost:8080/page1， 
    // 然后刷新页面试试。是不是发现刷新后404了。为什么？dist文件夹里面并没有page1.html,当然会404了，所以我们需要配置
    // historyApiFallback，让所有的404定位到index.html。
    // host 指定一个host,默认是localhost。如果你希望服务器外部可以访问，指定如下：host: “0.0.0.0”。比如你用手机通过IP访问。
    // hot 启用Webpack的模块热替换特性。关于热模块替换，我下一小节专门讲解一下。
    // port 配置要监听的端口。默认就是我们现在使用的8080端口。
    // proxy 代理。比如在 localhost:3000 上有后端服务的话，你可以这样启用代理：
    // progress（CLI only） 将编译进度输出到控制台。
    devServer: {
        port: 8080,
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: true,
        host: '0.0.0.0',
        proxy: {
            "*/api/*": "http://localhost:8090/"
        }
    },
    // src文件夹下面的以.js结尾的文件，要使用babel解析
    // cacheDirectory是用来缓存编译结果，下次编译加速
    // postcss-cssnext 允许你使用未来的 CSS 特性（包括 autoprefixer）
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', "postcss-loader"]
            },
        ]
    },
    plugins: [
        // 热加载插件
        new webpack.HotModuleReplacementPlugin(),
    ],
};

module.exports = merge({
    customizeArray(a, b, key) {
        /*entry.app不合并，全替换*/
        if (key === 'entry.app') {
            return b;
        }
        return undefined;
    }
})(commonConfig, devConfig);