# webpack 生产环境基本配置 [(GitHub)](https://github.com/GYQ-LQ/quinn-webpack-actual/tree/master/11-prod_conf)

## webpack.config.js

```
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 定义node环境： 决定使用browserlist使用哪个环境
process.env.NODE_ENV = 'production';
// 复用loader
const commonLoader = [
  {
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
        // eslint-disable-next-line global-require
        require('postcss-preset-env')(),
      ],
    },
  },
];

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/[name].bundle.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [...commonLoader],
      },
      {
        test: /\.scss$/,
        use: [...commonLoader, 'sass-loader'],
      },
      /*
        正常来讲，一个文件只能被一个loader处理
        当一个文件要被多个loader处理的时候，一定要指定loader执行的先后顺序：
          先执行eslint 再执行babel
      */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        // 优先执行 先eslint后babel
        enforce: 'pre',
        options: {
          fix: true,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                // 按需加载
                useBuiltIns: 'usage',
                // 指定core-js版本
                corejs: {
                  version: 3,
                },
                // 指定兼容到浏览器的哪个版本
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17',
                },
              },
            ],
          ],
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          outputPath: 'imgs',
        },
      },
      {
        test: /\.(html|htm)$/,
        loader: 'html-loader',
      },
      {
        exclude: /\.(html|htm|css|scss|js|png|jpg|jpeg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'assets',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: './css/[name].bundle.css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // 压缩html
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
      },
    }),
  ],
  mode: 'production',
  devServer: {
    // 构建后的目录
    contentBase: resolve(__dirname, 'build'),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true,
  },
};

```

## package.json

```
{
  "name": "quinn-webpack-actual",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/GYQ-LQ/quinn-webpack-actual.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/GYQ-LQ/quinn-webpack-actual/issues"
  },
  "homepage": "https://github.com/GYQ-LQ/quinn-webpack-actual#readme",
  "devDependencies": {
    "@babel/core": "^7.11.1",
    "@babel/polyfill": "^7.10.4",
    "@babel/preset-env": "^7.11.0",
    "babel-loader": "^8.1.0",
    "clean-webpack-plugin": "^3.0.0",
    "core-js": "^3.6.5",
    "css-loader": "^4.0.0",
    "eslint": "^7.6.0",
    "eslint-config-airbnb-base": "^14.2.0",
    "eslint-loader": "^4.0.2",
    "eslint-plugin-import": "^2.22.0",
    "file-loader": "^6.0.0",
    "html-loader": "^1.1.0",
    "html-webpack-plugin": "^4.3.0",
    "less-loader": "^6.2.0",
    "mini-css-extract-plugin": "^0.9.0",
    "node-sass": "^4.14.1",
    "optimize-css-assets-webpack-plugin": "^5.0.3",
    "postcss-loader": "^3.0.0",
    "postcss-preset-env": "^6.7.0",
    "sass-loader": "^9.0.2",
    "style-loader": "^1.2.1",
    "url-loader": "^4.1.0",
    "webpack": "^4.44.0",
    "webpack-cli": "^3.3.12",
    "webpack-dev-server": "^3.11.0"
  },
  "browserslist": {
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ],
    "production": [
      ">0.1%",
      "not dead",
      "not op_mini all"
    ]
  },
  "eslintConfig": {
    "extends": "airbnb-base"
  }
}

```
