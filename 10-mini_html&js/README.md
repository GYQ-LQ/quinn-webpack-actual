# webpack 压缩 html 和 js [(GitHub)](https://github.com/GYQ-LQ/quinn-webpack-actual/tree/master/10-mini_html&js)

## js 代码压缩

### 生产环境自动压缩

- 将 mode 调为 production 即可，webpack.config.js:

```
module.exports = {
  // 生产环境下会自动压缩js代码 production
  mode: 'production',
};
```

## html 代码压缩

- 下载

```
npm i babel-loader @babel/core @babel/preset-env -D
```

- 使用 webpack.config.js:

```
module.exports = {
  plugins: [
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
  ]
};

```
