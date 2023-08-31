const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 

module.exports = {
    mode: "development",
    entry: "./app/app.jsx",
    output:{
        path: path.resolve(__dirname, "./public"),
        publicPath: "/public/",
        filename: "bundle.js" 
    },
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, "/"),
        },
        port: 8081,
        open: true
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.css",
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
    }
}