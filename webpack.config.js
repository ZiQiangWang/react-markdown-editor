var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var extractTextPlugin = require("extract-text-webpack-plugin");

// 定义路径
const PATHS = {
    root: path.resolve(__dirname),
    src: path.resolve(__dirname, 'src'),
    dist: path.resolve(__dirname, 'dist'),
    node_modules: path.resolve(__dirname, 'node_modules')
};

module.exports = {
    entry: './src/index',
    output: {
        path: PATHS.dist,
        filename: 'js/[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                use: ['babel-loader'],
                exclude: PATHS.node_modules,
                include: PATHS.src,
            },
            {
                test: /\.less$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader?importLoaders=1','postcss-loader','less-loader']
                }),
                exclude: PATHS.node_modules,
                include: PATHS.src
            },
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader?importLoaders=1','postcss-loader']
                })
            },
            {
                test: /\.html$/,
                use: [ 'html-loader' ],
                exclude: PATHS.node_modules,
                include: PATHS.src
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [ 'url-loader?limit=1024&name=images/[hash:8].[name].[ext]&publicPath=../' ],
                exclude: PATHS.node_modules,
                include: PATHS.src
            },
            {
                test: /\.(svg|eot|ttf|woff)$/,
                use: [ 'url-loader?limit=1024&name=fonts/[name].[ext]&publicPath=../' ],
                exclude: PATHS.node_modules,
                include: PATHS.src
            }
        ]

    },
    plugins: [
        
        // html文件导出，这里的将文件导出到根目录
        new htmlWebpackPlugin({
          template: './src/template/index.html',
          filename: 'index.html',
          inject: 'body',
        }),
        // css文件导出
        new extractTextPlugin("css/style.css"),
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        })
    ],
    resolve: {
        extensions: ['jpg','.js', '.jsx', 'css', '.less'] //后缀名自动补全
    }
};
