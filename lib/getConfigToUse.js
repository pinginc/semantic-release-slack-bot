import micromatch from 'micromatch'

export default (pluginConfig, context) => {
  const {
    branch: { name }
  } = context

  const { branchesConfig = [], ...globalPluginConfig } = pluginConfig
  // eslint-disable-next-line no-unused-vars
  const { pattern, ...branchConfig } =
    branchesConfig.find(({ pattern }) => micromatch.isMatch(name, pattern)) ||
    {}

  return { ...globalPluginConfig, ...branchConfig }
}
