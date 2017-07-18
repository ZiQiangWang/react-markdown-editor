var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');

// 定义路径
const PATHS = {
    root: path.resolve(__dirname),
    src: path.resolve(__dirname, 'src'),
    dist: path.resolve(__dirname, 'dist'),
    node_modules: path.resolve(__dirname, 'node_modules')
};

module.exports = {
    devtool: false,
    entry: {
        main: './src/index',
        vendor: ['react','react-dom','react-codemirror','highlight.js','prop-types']
    },
    output: {
        path: PATHS.dist,
        filename: 'js/[name].bundle.js',
        library: 'JsonStruct',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                use: ['babel-loader'],
                exclude: [PATHS.node_modules,'src/index.js'],
                include: PATHS.src,
            },
            {
                test: /\.less$/,
                use: ['style-loader','css-loader?importLoaders=1&minimize=1','postcss-loader','less-loader'],
                exclude: PATHS.node_modules,
                include: PATHS.src
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader?importLoaders=1&minimize=1','postcss-loader'],
            },
            {
                test: /\.html$/,
                use: [ 'html-loader' ],
                exclude: PATHS.node_modules,
                include: PATHS.src
            },
            {
                test: /\.(svg|eot|ttf|woff)$/,
                use: [ 'url-loader?name=fonts/[name].[ext]&publicPath=../' ],
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
        new webpack.optimize.CommonsChunkPlugin({ 
            name: 'vendor', 
            filename: 'js/vendor.bundle.js' 
        }),
        new webpack.optimize.UglifyJsPlugin({
          output: { comments: false },
          compress: { warnings: false }
        }),
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
