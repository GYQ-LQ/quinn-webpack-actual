# webpack 打包 图片 资源 [(GitHub)](https://github.com/GYQ-LQ/webpack-actual/tree/master/04-img_source)

## 打包图片资源

### 1、下载

> npm i url-loader file-loader -D

### 2、使用

- webpack.config.js

```
module.exports = {
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
                    // 图片大小小于8kb，会被base64处理
                    // 优点：减少请求数量，减轻服务器压力
                    // 缺点： 图片体积会更大，请求速度慢
                    limit: 8 * 1024,
                    // [hash:10] 取图片的hash前十位进行重命名
                    // [ext] 文件的原本扩展名
                    name: '[hash:10].[ext]',
                },
            },
        ],
    },
}
```

> **问题：处理不了 html 中的 img 图片**

```
<img src="./imgs/webpack.png" alt="webpack" />
```

## 处理问题

### 1、下载

> npm i html-loader -D

### 2、使用

- webpack.config.js

```
module.exports = {
    module: {
        rules: [
            {
                test: /\.html$/,
                // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
                loader: 'html-loader',
            },
        ],
    },
}
```
