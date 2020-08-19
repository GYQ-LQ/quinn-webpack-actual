# webpack 简介、核心及初体验 [(GitHub)](https://github.com/GYQ-LQ/quinn-webpack-actual/tree/master/01-first_try)

## webpack 简介

> webpack 是一种前端资源构建工具，一个静态模块打包器（module bundle）。

构建工具：

- .less --构建--> .css ,
- .js(es6) --构建--> .js(浏览器认识的 js) ,
- .xxx --构建--> .xxx

静态资源打包器：

modules dependencies --引入--> chunk 块 --打包--> bundle

![静态资源打包器](https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=991327083,946282460&fm=26&gp=0.jpg)

对于 webpack，前端的所有资源文件（js/css/img/json/less/...）都会作为模块处理。

webpack 将根据模块的依赖关系进行静态分析，打包生成对应的静态资源（bundle）。

## webpack 五个核心概念

Entry：指示以哪个入口起点开始打包，分析构建内部依赖图。
Output：输出打包后的资源 bundles 输出到哪里去
Loader：处理非 js 文件（webpack 本身只理解 js）
Plugins：插件范围更广的任务。打包优化、压缩、重新定义环境中的变量等。
Mode：development 开发模式、production 生产模式

## webpack 初体验

index.js 作为打包起点

1. 运行环境：

   - 开发环境：webpack ./src/index.js -o ./build/build.- js --mode=development
     - webpack 会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/build.js
     - 整体打包环境是开发环境
   - 生产环境：webpack ./src/index.js -o ./build/build.js --mode=production
     - webpack 会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/build.js
     - 整体打包环境是生产环境：webpack

2. 结论：
   - webpack 能处理 js、json 资源，不能处理 css/img 等其他资源
   - 生产环境和开发环境将 es6 模块化编译成浏览器能识别的模块化
   - 生产环境比开发环境多一个压缩 js 代码
