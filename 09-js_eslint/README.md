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

### 1. 下载

```
npm i eslint eslint-loader eslint-config-airbnb-base eslint-plugin-import -D
```

### 2. 使用
