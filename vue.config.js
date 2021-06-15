module.exports = {
  devServer: {
    open: true,
    port: 8088
  },
  // rem配置
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            // 其实就是设计图的 rootFontSize
            // 这里推荐写37.5
            // 考虑到如果使用了第三方的ui库，会有问题。
            // 量设计图的时候，把设计图缩小一倍
            // 750设计图，我当然可以使用75作为remUnit，写页面时就按照设计图尺寸来写
            // 但是这样的话，当使用第三方组件库时，大小都会缩小
            // 所以正常的话使用375设计图来写页面，设置remUnit值为37.5
            remUnit: 36
          })
        ]
      }
    }
  }
}