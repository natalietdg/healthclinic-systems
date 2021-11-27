const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const dotenv = require('dotenv').config({path: path.resolve(__dirname, '/.env')});
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlMinimizerWebpackPlugin = require('html-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const JsonMinimizerPlugin = require("json-minimizer-webpack-plugin");

const dotEnv = new webpack.DefinePlugin({
    "process.env": {
        'NODE_PATH': JSON.stringify(process.env.NODE_PATH),
        'PUBLIC_PATH': JSON.stringify(process.env.PUBLIC_PATH),
        'SECRET_KEY': JSON.stringify(process.env.SECRET_KEY),
        'JWT_ALG': JSON.stringify(process.env.JWT_ALG),
        'JWT_TYPE':JSON.stringify(process.env.JWT_TYPE),
        'WEBSITE':JSON.stringify(process.env.WEBSITE),
        'BUSINESS': JSON.stringify(process.env.BUSINESS),
        'EMAIL':JSON.stringify(process.env.EMAIL)
    }
});

module.exports = {
    performance: {
        hints: false
    },
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    plugins: [
        new CompressionPlugin(),
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
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
                },
                {
                    from: 'src/*.html',
                    to: 'dist/'
                }
            ]
        }),
        dotEnv
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new HtmlMinimizerWebpackPlugin(),
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    parse: {
                        ecma: 8
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        comparisons: false,
                        inline: 2
                    },
                    mangle: {
                        safari10: true
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        ascii_only: true
                    },
                },
                parallel: true,
                extractComments: false,
            }),
            new JsonMinimizerPlugin()
        ]
    },
    devtool: 'source-map',
    devServer: {
        static: path.resolve(__dirname, 'public'),
        historyApiFallback: true,
        port: process.env.PORT || 8080,
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
                test: /\.(jpe?g|png|gif|svg|ttf|eot)$/i,
                type: 'asset/resource',
                use: ['file-loader'],
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
    },
}