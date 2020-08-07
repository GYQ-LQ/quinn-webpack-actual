# webpack js 的 eslint 语法检查及兼容性处理 [(GitHub)](https://github.com/GYQ-LQ/webpack-actual/tree/master/09-js_eslint)

## eslint 语法检查

### 1. 下载

```
npm i eslint eslint-loader eslint-config-airbnb-base eslint-plugin-import -D
```

### 2. 使用

1. 语法检查：eslint-loader eslint
2. 注意：只检查自己的代码，第三方库不检查 exclude 排除
3. 设置检查规则：package.json 中 eslintConfig 中设置
   - airbnb: eslint-config-airbnb 包含 react 风格建议
   - eslint-config-airbnb-base 不包含 react， ES6+
   - eslint-config-airbnb-base/legacy 不包含 react， ES5 and below
4. 使用 eslint-config-airbnb-base，需下载：
   - eslint , eslint-loader , eslint-config-airbnb-base , eslint-plugin-import

- webpack.config.js:

```
module.exports = {
    module: {
        rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'eslint-loader',
              options: {
                // 自动修复 eslint 错误
                fix: true,
              },
            }
        ],
    },
}
```

- package.json:

```
{
  "eslintConfig": {
    "extends": "airbnb-base"
  }
}
```

## js 兼容性处理 eslint

js 兼容性处理 : babel-loader @babel/core @babel/preset-env

1. 基本的兼容性处理 --> @babel/preset-env
   - 问题：只能转换基本语法 , 如：箭头函数， Promise 等转换不了
2. 全部的兼容性处理 --> @babel/polyfill
   - 使用：js 文件直接导入，导入全部兼容方法
     - import '@babel/polyfill';
   - 问题：@babel/polyfill 将所有兼容性代码全部引入，体积太大，无法按需兼容
3. 按需兼容处理 --> core-js

### 1. 基本的兼容性处理 --> @babel/preset-env

- 下载

```
npm i babel-loader @babel/core @babel/preset-env -D
```

- 使用 webpack.config.js:

```
module.exports = {
    module: {
        rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
              options: {
                presets: [ '@babel/preset-env' ],
              },
        ],
    },
}
```

> 问题：只能转换基本语法 , 如：箭头函数；高级函数 Promise 等转换不了

### 2. 全部的兼容性处理 --> @babel/polyfill

- 下载

```
npm i @babel/polyfill -D
```

- 使用：js 文件直接导入，导入全部兼容方法

```
import '@babel/polyfill';
```

> 问题：@babel/polyfill 将所有兼容性代码全部引入，体积太大，无法按需兼容

### 3. 按需兼容处理 --> core-js

- 下载

```
npm i core-js -D
```

- 使用 webpack.config.js:

```
module.exports = {
    module: {
        rules: [
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
        ],
    },
}
```
