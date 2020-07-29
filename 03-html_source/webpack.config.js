const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        }, ],
    },
    plugins: [
        // html-webpack-plugin
        // 功能：默认创建一个空的html文件，自动引入输出打包的所有资源（js / css）
        // 需求：需要有结构的html文件
        new HtmlWebpackPlugin({
            // 复制 ./src/index.html 文件，并自动引入打包输出所有的资源（js/css）
            template: './src/index.html',
        }),
    ],
    mode: 'development',
}