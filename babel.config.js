const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

const plugins = []
if (IS_PROD) {
  plugins.push('transform-remove-console')
}

module.exports = {
  sourceType: "unambiguous",
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins
}