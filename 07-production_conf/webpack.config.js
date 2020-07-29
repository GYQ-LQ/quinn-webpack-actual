const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: ['file-loader']
            },
            {
                test: /\.(html|htm)$/,
                loader: 'html-loader'
            },
            {
                exclude: /\.(css|scss|png|jpg|js|jpeg|gif|svg|html|htm)$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'production',
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
        open: true
    }
}