# webpack 打包样式资源 [(GitHub)](https://github.com/GYQ-LQ/webpack-actual/tree/master/02-style_source)

webpack.config.js webpack 的配置文件。

## 打包 css 文件

### 1、下载

> npm i css-loader style-loader -D

### 2、使用

- webpack.config.js

```
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
        // 输出路径  __dirname：nodejs的变量，代表当前文件的绝对目录路径
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
        ],
    },
    plugins: [
        // 详细的plugins插件配置
    ],
    // 模式
    mode: 'development',
    // mode: 'production'
}
```

## 打包 less 等其他文件

### 1、下载

> npm i less-loader -D

### 2、使用

- webpack.config.js

```
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
```
