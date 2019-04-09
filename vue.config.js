module.exports = {
  // 基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  devServer: {
    host: 'localhost',
    port: 8094,
    https: false, // https:{type:Boolean}
    hotOnly: true, // 热更新
    proxy: {
      '/api': {
        target: 'http://localhost:9527/api/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  css: {
    sourceMap: true,
  },
  chainWebpack: config => {
    // 一个规则里的 基础Loader
    // svg是个基础loader
    const svgRule = config.module.rule('svg')

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear()

    // 添加要替换的 loader
    svgRule
        .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
                })
        
  }
}