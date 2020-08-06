const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      /*
      语法检查：eslint-loader eslint
      注意：只检查自己的代码，第三方库不检查 exclude排除
      设置检查规则：
        package.json 中 eslintConfig 中设置
        airbnb: eslint-config-airbnb 包含 react风格建议
                eslint-config-airbnb-base 不包含react，  ES6+
                eslint-config-airbnb-base/legacy 不包含react， ES5 and below
        使用eslint-config-airbnb-base，需下载：
          eslint , eslint-loader , eslint-config-airbnb-base ,  eslint-plugin-import

      */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // 自动修复 eslint 错误
          fix: true,
        },
      },
      /*
        js 兼容性处理 : babel-loader @babel/preset-env @babel/core
        1. 基本的兼容性处理
      */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  mode: 'development',
};
