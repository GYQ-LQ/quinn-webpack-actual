# webpack 打包 其他 资源 [(GitHub)](https://github.com/GYQ-LQ/webpack-actual/tree/master/05-other_source)
 
## 下载
```
npm i file-loader -D
```
## 使用
``` 
module.exports = { 
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            {
                test: /\.(jpg|png|gif|jpeg)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                },
            },
            {
                test: /\.html$/,
                // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
                loader: 'html-loader',
            }, {
                // 打包其他资源 （除了html、css、less、js资源以外的资源）
                exclude: /\.(css|less|js|html)$/,
                loader: 'file-loader'
            },
        ]
    }, 
}
```