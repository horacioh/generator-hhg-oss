import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'generate',
  alias: ['g'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { spin },
      template: { generate },
      filesystem
    } = toolbox
    // text input
    const askModuleName = {
      type: 'input',
      name: 'moduleName',
      message: 'What do you want to name your module?'
    }

    const askDevDep = {
      type: 'confirm',
      name: 'devDep',
      message: 'Should people install this as one of their devDependencies?',
      default: true
    }

    const askModuleDescription = {
      type: 'input',
      name: 'description',
      message: `What's the project description?`,
      default: 'No description provided :('
    }

    const askWebsite = {
      type: 'input',
      name: 'website',
      message: "What's your website?",
      default: '<YOUR_WEBSITE>'
    }

    // ask a series of questions
    const questions = [askModuleName, askDevDep, askModuleDescription, askWebsite]
    const props = await toolbox.prompt.ask(questions)

    const spinner = spin(`generating ${props.moduleName} scaffold...`)

    await filesystem.copyAsync(`${__dirname}/../templates/copyFiles`, `${process.cwd()}/${props.moduleName}`)

    await generate({
      template: `package.json.ejs`,
      target: `${props.moduleName}/package.json`,
      props
    })

    await generate({
      template: `README.md.ejs`,
      target: `${props.moduleName}/README.md`,
      props
    })

    await generate({
      template: `all-contributorsrc.ejs`,
      target: `${props.moduleName}/all-contributorsrc`,
      props
    })

    await generate({
      template: `CONTRIBUTING.md.ejs`,
      target: `${props.moduleName}/CONTRIBUTING.md`,
      props
    })

    await generate({
      template: `github/ISSUE_TEMPLATE.md.ejs`,
      target: `${props.moduleName}/github/ISSUE_TEMPLATE.md`,
      props
    })

    spinner.succeed(`Project Created!`)
  }
}
