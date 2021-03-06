const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader'],
        }, {
            test: /\.(png|jpg|jpeg|gif|svg)$/,
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
        }, {
            test: /\.(html|htm)$/,
            loader: 'html-loader',
        }, {
            exclude: /\.(html|htm|css|less|js|png|jpg|jpeg|gif|svg)$/,
            loader: 'file-loader',
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'production',
    // 开发服务器 devServer： 用来自动化（自动化编译、自动打开浏览器、自动刷新浏览器）
    // 特点： 只会在内存中打包，不会有任何输出bundle.js
    // 启动devServer指令：npx webpack-dev-server
    devServer: {
        // 构建后的目录
        contentBase: path.resolve(__dirname, 'build'),
        // 启动gzip压缩
        compress: true,
        // 端口号
        port: 3000,
        // 自动打开浏览器
        open: true
    }
}