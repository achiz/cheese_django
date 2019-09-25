const BundleTracker = require("webpack-bundle-tracker");
const path = require('path');

module.exports = {
    //publicPath: "http://127.0.0.1:8080/",
    //outputDir: './dist/',
    filenameHashing: false,
    productionSourceMap: false,
    publicPath: process.env.NODE_ENV === 'production' ?
        '' : 'http://127.0.0.1:8080/',
    //assetsDir: 'static',


    chainWebpack: config => {

        config.optimization
            .splitChunks({
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "chunk-vendors",
                        chunks: "all",
                        priority: 1
                    },
                },
            });

        config
            .plugin('BundleTracker')
            .use(BundleTracker, [{
                filename: '../frontend/webpack-stats.json'
            }])

        config.resolve.alias
            .set('__STATIC__', 'static')

        config.devServer
            .public('http://127.0.0.1:8080')
            .host('127.0.0.1')
            .port(8080)
            .hotOnly(true)
            .watchOptions({
                poll: 1000
            })
            .https(false)
            .headers({
                "Access-Control-Allow-Origin": ["\*"]
            });


           

        if (process.env.NODE_ENV === 'production') {
             const inlineLimit = 10000;
             const assetsPath = '';

        //     config
        //         .output
        //         .filename(path.join(assetsPath, 'js/[name].[chunkhash:8].js'))
        //         .chunkFilename(path.join(assetsPath, '/js/chunk[id].[chunkhash:8].js'))

            config.module
                .rule('images')
                .test(/\.(png|jpe?g|gif)(\?.*)?$/)
                .use('url-loader')
                .loader('url-loader')
                .options({
                    limit: inlineLimit,
                    name: path.join(assetsPath, 'static/img/[name].[hash:8].[ext]')
                })

        //     config.module
        //         .rule('fonts')
        //         .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
        //         .use('url-loader')
        //         .loader('url-loader')
        //         .options({
        //             limit: inlineLimit,
        //             name: path.join(assetsPath, 'fonts/[name].[hash:8].[ext]')
        //         })
         }

    },


    transpileDependencies: ['vuetify']

};