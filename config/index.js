// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: false,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 8083,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/wx': {
                // target: 'http://192.168.33.226/',
                // target: 'http://192.168.33.187:9092/',
                // 测试环境
                // target: 'http://192.168.13.64:9999/',
                // target: 'http://127.0.0.1:9090/',
                // target: 'http://192.168.13.230:8888/',
                // 洪
                // target: 'http://192.168.33.120:9090',
                // 黄敏
                // target: 'http://192.168.33.170:9090',
                // 智敏
                target: 'http://192.168.33.133:9999/',
                // target: 'http://report.bainuogene.com/',
                // 潘
                // target: 'http://192.168.33.172:9090/',
                changeOrigin: true,
                pathRewrite: {
                    '^/wx': ''
                }
            }
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}
