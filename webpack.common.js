const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    /* entry */
    entry: "./src/index.js",
    /* output */
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    /* module */
    module: {
        rules: [
            /* Style and Css Loader */
            {
                /* tipe berkas yang akan ditransformasikan */
                test: /\.css$/,
                /* loader yang akan digunakan untuk mentransformasikan berkas */
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            }
        ]
    },
    /* plugin */
    plugins: [
        /* HTML Webpack Plugin */
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src/images'),
                to: path.resolve(__dirname, 'dist/src/images')
            }]
        })
    ]
}