var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');

// 定义路径
const PATHS = {
    root: path.resolve(__dirname),
    example: path.resolve(__dirname, 'example'),
    src: path.resolve(__dirname, 'example/src'),
    dist: path.resolve(__dirname, 'example/dist'),
    node_modules: path.resolve(__dirname, 'node_modules')
};

module.exports = {
    entry: {
        main: './example/src/index'
    },
    output: {
        path: PATHS.dist,
        filename: 'js/[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                use: ['babel-loader'],
                include: [
                    PATHS.example
                ]
            },
            {
                test: /\.html$/,
                use: [ 'html-loader' ],
                exclude: PATHS.node_modules,
                include: PATHS.example
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader?importLoaders=1','postcss-loader']
            },
            {
                test: /\.(svg|eot|ttf|woff)$/,
                use: [ 'url-loader?name=fonts/[name].[ext]' ],
                exclude: PATHS.node_modules
            }
        ]

    },
    plugins: [
        
        // html文件导出，这里的将文件导出到根目录
        new htmlWebpackPlugin({
          template: './example/src/index.html',
          filename: 'index.html',
          inject: 'body',
        })
    ],
    resolve: {
        extensions: ['jpg','.js', '.jsx', 'css', '.less'] //后缀名自动补全
    }
};
