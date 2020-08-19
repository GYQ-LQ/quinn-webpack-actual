# webpack devServer [(GitHub)](https://github.com/GYQ-LQ/quinn-webpack-actual/tree/master/06-devServer)

> 开发服务器 devServer： 用来自动化（自动化编译、自动打开浏览器、自动刷新浏览器）

> 特点： 只会在内存中打包，不会有任何输出 bundle.js

> 启动 devServer 指令：npx webpack-dev-server

## 1、下载

```
npm i webpack-dev-server -D
```

## 2、使用

- webpack.config.js

```
module.exports = {
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
```
