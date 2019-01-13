import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'generator-hhg-oss',
  run: async (toolbox: GluegunToolbox) => {
    const { print } = toolbox

    print.printHelp(toolbox);
  },
}
