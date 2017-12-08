module.exports = (env) => ({
  extensions: ['.ts', '.tsx', '.js', '.json'],
  modules: [env.srcDirectory, "node_modules"],
  alias: {
  },
})
