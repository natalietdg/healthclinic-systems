const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: "/",
    },
    plugins: [
        new HtmlWebpackPlugin({
          title: 'Output Management',
          template: './src/index.html'
        }),
        new CopyWebPackPlugin({
            patterns: [
                {
                    context: 'public/',
                    from: 'assets/**/*',
                }
            ]
        }),
        new Dotenv({
            path: './.env',
            safe: true
        })
    ],
    devtool: 'inline-source-map',
    devServer: {
        static: path.resolve(__dirname, 'public'),
        historyApiFallback: true,
        port: 8080
    },
    resolve: {
        extensions: [".ts", ".tsx", ".jsx", ".js", ".json"],
        alias: {
            Components: path.resolve(__dirname, 'src/components'),
            Pages: path.resolve(__dirname, 'src/pages'),
            Recoil: path.resolve(__dirname, 'src/recoil'),
            Utils: path.resolve(__dirname, 'src/utils'),
            Services: path.resolve(__dirname, 'src/services'),
            Public: path.resolve(__dirname, 'public'),
            Shared: path.resolve(__dirname, 'src/components/shared'),
            Helpers: path.resolve(__dirname, 'src/helpers'),
            src: path.resolve(__dirname, 'src'),
            Data: path.resolve(__dirname, 'src/data'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.svg$/i,
                type: 'asset/resource',
                use: ['file-loader']
            },
            {
                test: /\.(s?css|css|sass)$/i,
                include: path.resolve(__dirname, 'src'),
                use: ['style-loader', 'css-loader', 'sass-loader', {
                    loader: 'sass-resources-loader',
                    options: {
                        resources: require(path.join(process.cwd(),
                        "./style-dictionary/dist/scss/utils.js"))
                    }
                }]
            },
        ]
    }
}