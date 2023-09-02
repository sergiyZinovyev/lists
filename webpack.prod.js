const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "production",
    entry: "./app/app.jsx",
    output:{
        path: path.resolve(__dirname, "./build"),
        publicPath: "/build/",
        filename: "bundle.js" 
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.css",
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "index.html"),
            minify: true,
            publicPath: "",
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "assets"),
                    to: path.resolve(__dirname, "build/assets"),
                },
            ],
        }),
    ],
    module:{
        rules:[   
            {
                test: /\.jsx?$/, 
                exclude: /(node_modules)/,  
                loader: "babel-loader",   
                options:{
                    presets:[ "@babel/preset-react"]   
                }
            },
            {
                test: /\.module\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]__[hash:base64:5]',
                            },
                        },
                    },
                ],
            },
        ]
    },
    optimization: {
        minimize: true, // Минификация JS
        // Дополнительные оптимизации могут быть добавлены здесь
    }
}