const merge = require("webpack-merge");
const common = require("./webpack.common.js");


module.exports = merge(common, {
    mode: "production",
    module: {
        rules: [
            /* Babel Loader */
            {
                /* tipe berkas yang akan ditransformasikan */
                test: /\.js$/,
                /* mengecualikan webpack untuk memproses berkas .js yang berada pada folder “node_modules” */
                exclude: "/node_modules/",
                /* loader yang akan digunakan untuk mentransformasikan berkas */
                use: [{
                    loader: "babel-loader",
                    /* konfigurasi pada loader */
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }]
            }
        ]
    }
})