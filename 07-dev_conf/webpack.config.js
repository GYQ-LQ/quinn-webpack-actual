const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
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
    ],
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        port: 3000,
        compress: true,
        open: true,
    },
}