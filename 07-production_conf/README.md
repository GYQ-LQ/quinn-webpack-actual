# webpack 开发环境配置 [(GitHub)](https://github.com/GYQ-LQ/webpack-actual/tree/master/07-production_conf)

## 下载

```
npm i clean-webpack-plugin -D
```

## 配置

- webpack.config.js:

```
const path = require('path')
// 构建index.html文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 清理 build 目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    // 打包入口
    entry: './src/js/index.js',
    output: {
        // 打包到build下的js文件夹
        filename: 'js/[name].bundle.js',
        // 打包路径
        path: path.resolve(__dirname, 'build'),
    },
    module: {
        rules: [
            // 打包css文件
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            // 打包scss文件
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            // 打包图片文件
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    // 文件大小小于10kb时，会被base64处理
                    limit: 10 * 1024,
                    // 用hash值给文件命名
                    name: '[hash:12].[ext]',
                    // 打包到build下的imgs文件夹
                    outputPath: 'imgs',
                },
            },
            // 处理html文件中的图片 img标签
            {
                test: /\.(html|htm)$/,
                loader: 'html-loader',
            },
            // 打包其他资源
            {
                exclude: /\.(html|htm|png|jpg|jpeg|gif|svg|scss|css|js)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:12].[ext]',
                    // 打包到build下的assets文件夹
                    outputPath: 'assets',
                },
            },
        ],
    },
    plugins: [
        // 清理文件夹
        new CleanWebpackPlugin(),
        // 根据模版构建html文件
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
    // 开发模式
    mode: 'development',
    // devServer服务器
    devServer: {
        // 路径
        contentBase: path.resolve(__dirname, 'build'),
        // 端口
        port: 3000,
        // gzip压缩
        compress: true,
        // 自动打开浏览器
        open: true,
    },
}
```
