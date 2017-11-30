module.exports = (env) => ({
  extensions: ['.ts', '.js', '.vue', '.json'],
  modules: [env.srcDirectory, "node_modules"],
  alias: {
    'vue$': 'vue/dist/vue.esm.js',
  },
})
