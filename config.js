module.exports = {
  browserSync: {
    ui: false, // 完全禁用 UI
    serveStatic: ['src/'],
    server: {
      index: 'index.html' // 静态服务器打开的首页面，可以根据需要配置
    },
    port: 3030,
    ghostMode: false, // 所有设备里同步 点击、滚动、表单数据
    open: true, // 自动打开浏览器
    notify: false // 禁止更新页面时浏览器窗口右上角的提示
  },
  css: {
    autoprefixer: {
      browsers: ['Android >= 4.0', 'iOS >= 7'] // 自动添加兼容前缀平台列表
    },
    px2rem: {
      open: true, // 是否开启 px -> rem
      remUnit: 72 // 基准单元
    }
  }
}
