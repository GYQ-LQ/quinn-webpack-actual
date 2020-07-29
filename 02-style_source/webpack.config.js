/* 
    webpack配置文件
    所有的构建工具都是基于nodejs平台运行 模块化默认采用commonjs
*/
const path = require('path')
module.exports = {
    // 入口文件
    entry: './src/index.js',
    // 输出
    output: {
        // 输出文件名
        filename: 'bundle.js',
        // 输出路径 __dirname：nodejs的变量，代表当前文件的绝对目录路径
        path: path.resolve(__dirname, 'build'),
    },
    module: {
        rules: [
            // 详细的loader配置
            {
                // 匹配哪些文件
                test: /\.css$/,
                // 使用哪些loader，use数组执行顺序：从后往前
                use: [
                    // style-loader 创建style标签，将js的样式字符串资源插入到html的head中生效
                    'style-loader',
                    // css-loader 将css文件变成commonjs模块加载到js中，样式字符串
                    'css-loader',
                ],
            },
            {
                // 匹配哪些文件
                test: /\.less$/,
                // 使用哪些loader，use数组执行顺序：从后往前
                use: [
                    // style-loader 创建style标签，将js的样式字符串资源插入到html的head中生效
                    'style-loader',
                    // css-loader 将css文件变成commonjs模块加载到js中，样式字符串
                    'css-loader',
                    // 将less文件编译成css文件
                    'less-loader',
                ],
            },
        ],
    },
    plugins: [
        // 详细的plugins插件配置
    ],
    // 模式
    mode: 'development',
    // mode: 'production'
}