# webpack css 的提取、兼容、压缩 [(GitHub)](https://github.com/GYQ-LQ/webpack-actual/tree/master/08-css_bundle)

## 提取 css 成单独文件

### 1. 下载 

``` 
npm i mini-css-extract-plugin -D
```

### 2. 使用

* webpack.config.js:

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

css: 兼容性处理： postcss -->  postcss-loader  postcss-preset-env

### 1. 下载 

``` 
npm i postcss-loader  postcss-preset-env -D
```

### 2. 使用

``` 
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
                    /* css:兼容性处理： postcss -->  postcss-loader  postcss-preset-env
                        帮postcss找到package.json中browserslist里面配置，通过配置加载指定的css兼容性样式
                        "browserslist": { }
                   */
                    // 使用loader的默认配置： 'postcss-loader'
                    // 不使用默认配置，修改loader的配置
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                // postcss 的插件
                                require('postcss-preset-env')()
                            ]
                        }
                    },
                    {
                        test: /\.scss$/,
                        use: [{
                                loader: MiniCssExtractPlugin.loader,
                                options: {
                                    publicPath: '../',
                                    hmr: process.env.NODE_ENV === 'development',
                                },
                            },
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    ident: 'postcss',
                                    plugins: () => [
                                        // postcss 的插件
                                        require('postcss-preset-env')()
                                    ]
                                }
                            },
                            'sass-loader'
                        ],
                    },
                ],
            },  
        ],
    }, 
}
```

* package.json

``` 
"browserslist": {
    // 开发环境 ---> 设置node环境变量：process.env.NODE_ENV = development
    "development": [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
    ],
    // 生产环境，默认是看生产环境
    "production":[
        ">0.1%", // 大于99.9%的浏览器
        "not dead", // 不是“死的”浏览器
        "not op_mini all" // not op_mini
    ]
}
```

## 压缩 css 

### 1. 下载  

``` 
npm i optimize-css-assets-webpack-plugin -D
```

### 2. 使用

``` 
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: './css/[name].bundle.css'
        }),
        new OptimizeCssAssetsWebpackPlugin()
    ],
}
```
