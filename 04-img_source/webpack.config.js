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
                // 处理less资源
                test: /\.less$/,
                // 多个loader use用数组
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            {
                // 问题：处理不了html中的img图片
                // 处理图片资源
                test: /\.(jpg|png|gif|jpeg)$/,
                // 使用一个loader: file-loader url-loader
                loader: 'url-loader',
                options: {
                    // 图片大小8kb，会被base64处理
                    // 优点：减少请求数量，减轻服务器压力
                    // 缺点： 图片体积会更大，请求速度慢
                    limit: 8 * 1024,
                    // [hash:10] 取图片的hash前十位进行重命名
                    // [ext] 文件的原本扩展名
                    name: '[hash:10].[ext]',
                },
            },
            {
                test: /\.(html|htm)$/,
                // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
                loader: 'html-loader',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
    mode: 'development',
}