const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlMinimizerWebpackPlugin = require('html-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const JsonMinimizerPlugin = require("json-minimizer-webpack-plugin");

console.log('dirname', __dirname);

module.exports = {
    performance: {
        hints: false
    },
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/",
        clean: true
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_PATH': JSON.stringify(process.env.NODE_PATH),
            'process.env.PUBLIC_PATH':JSON.stringify(process.env.PUBLIC_PATH),
            'process.env.SECRET_KEY':JSON.stringify(process.env.SECRET_KEY),
            'process.env.JWT_ALG':JSON.stringify(process.env.JWT_ALG),
            'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV),
            'process.env.JWT_TYPE':JSON.stringify(process.env.JWT_TYPE),
            'process.env.WEBSITE':JSON.stringify(process.env.WEBSITE),
            'process.env.BUSINESS':JSON.stringify(process.env.BUSINESS),
            'process.env.EMAIL':JSON.stringify(process.env.EMAIL)
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          title: 'Output Management',
          template: './src/index.html',
          inject: true,
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
            path: path.resolve(__dirname,'.env'),
            safe: true
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new HtmlMinimizerWebpackPlugin(),
            new TerserPlugin({
                parallel: true
            }),
            new JsonMinimizerPlugin()
        ]
    },
    devtool: 'source-map',
    devServer: {
        static: path.resolve(__dirname, 'public'),
        historyApiFallback: true,
        port: process.env.PORT || 8080
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
                test: /\.(jpe?g|png|gif|svg)$/i,
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