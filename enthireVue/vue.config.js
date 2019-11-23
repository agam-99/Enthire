module.exports = {
  pluginOptions: {
    quasar: {
      rtlSupport: true
    }
  },devServer: {
        proxy: 'http://localhost:3000',
    },
  transpileDependencies: [
    /[\\\/]node_modules[\\\/]quasar[\\\/]/
  ]
}
