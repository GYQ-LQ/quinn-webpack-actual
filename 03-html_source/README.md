# webpack 打包 html 资源

### 1、下载

> npm i html-webpack-plugin -D

### 2、引用

```
const HtmlWebpackPlugin = require('html-webpack-plugin')
```

### 3、使用

```
module.exports = {
    plugins: [
        // html-webpack-plugin
        // 功能：默认创建一个空的html文件，自动引入输出打包的所有资源（js / css）
        // 需求：需要有结构的html文件
        new HtmlWebpackPlugin({
            // 复制 ./src/index.html 文件，并自动引入打包输出所有的资源（js/css）
            template: './src/index.html',
        }),
    ]
}
```
