# webpack css 的提取、兼容、压缩 [(GitHub)](https://github.com/GYQ-LQ/webpack-actual/tree/master/08-css_bundle)

## 提取 css 成单独文件

### 1. 下载

```
npm i mini-css-extract-plugin -D
```

### 2. 使用

- webpack.config.js:

```
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    module: {
        rules: [{
                test: /\.css$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../',
                        hmr: process.env.NODE_ENV === 'development',
                    },
                }, 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './css/[name].bundle.css'
        })
    ],
}
```

## css 兼容性处理

### 1. 下载

### 2. 使用
