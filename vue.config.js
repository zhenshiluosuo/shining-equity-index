module.exports = {
    devServer: {
        publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
        proxy: {
            '/api1': {
                target: 'http://img1.money.126.net',
                changeOrigin: true,
                pathRewrite: {
                    '^/api1' : '/'
                }
            },
            '/api2': {
                target: 'http://api.k780.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api2' : '/'
                }
            },
            '/sina1': {
                target: 'http://hq.sinajs.cn',
                changeOrigin: true,
                pathRewrite: {
                    '^/sina1' : '/'
                }
            },
            '/sina2': {
                target: 'http://image.sinajs.cn',
                changeOrigin: true,
                pathRewrite: {
                    '^/sina2' : '/'
                }
            },
            '/gtimg': {
                target: 'http://qt.gtimg.cn',
                changeOrigin: true,
                pathRewrite: {
                    '^/gtimg': '/'
                }
            }
        }
    }
}

/*
示例: 远程服务器未处理跨域，接口为: http://localhost:3000/api/
本地开发环境中的url为: http://localhost:8080
1.  proxy: {
2.    '/api5': {
3.        target: 'http://localhost:3000',
4.        pathRewrite: {
5.            '^/api5' : '/api'
6.        }
7.     }
8.   }
其中
第2行中的 '/api5'是自定义的本地请求时的名字
第3行的target表示代理的服务器url
第4行的pathRewrite表示路径重写
第5行的'^/api5'是一个正则表达式，表示要匹配请求的url中，全部'http://localhost:8080/api5' 转接为 http://localhost:3000/api/
*/
