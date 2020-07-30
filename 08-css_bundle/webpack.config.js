const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

// 设置node的环境变量
// process.env.NODE_ENV = "development"

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
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
                    }
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
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10 * 1024,
                    name: '[hash:12].[ext]',
                    outputPath: 'imgs',
                },
            },
            {
                test: /\.(html|htm)$/,
                loader: 'html-loader',
            },
            {
                exclude: /\.(html|htm|png|jpg|jpeg|gif|svg|scss|css|js)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:12].[ext]',
                    outputPath: 'assets',
                },
            },
        ],
    },
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
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        port: 3000,
        compress: true,
        open: true,
    },
}