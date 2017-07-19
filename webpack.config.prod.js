var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var extractTextPlugin = require("extract-text-webpack-plugin");

// 定义路径
const PATHS = {
    root: path.resolve(__dirname),
    src: path.resolve(__dirname, 'src'),
    lib: path.resolve(__dirname, 'lib'),
    node_modules: path.resolve(__dirname, 'node_modules')
};

module.exports = {
    devtool: false,
    entry: './src/style/index',
    output: {
        path: PATHS.lib,
        filename: 'css.js'
    },
    module: {
        rules: [
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
                test: /\.(svg|eot|ttf|woff)$/,
                use: [ 'url-loader?name=fonts/[name].[ext]' ],
                include: PATHS.src
            }
        ]

    },
    plugins: [
        new extractTextPlugin("css/style.css"),
        new webpack.DefinePlugin({
          "process.env": { 
             NODE_ENV: JSON.stringify("production") 
           }
        })
    ],
    resolve: {
        extensions: ['jpg','.js', '.jsx', 'css', '.less'] //后缀名自动补全
    }
};
