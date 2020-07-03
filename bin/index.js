#!/usr/bin/env node
const chalk = require('chalk')
const figlet = require('figlet')
const file = require('../libs/files')
const react = require('../libs/react/index')
const angul = require('../libs/angular/index')
const vue = require('../libs/vue/index')

console.log(
  chalk.yellow(figlet.textSync('RSautoWind', { horizontalLayout: 'full' }))
)
const run = async () => {
    if (await file.checkPackage()) {
      if (await file.checkFrameWork()) {
        const anre = await file.arv()
      switch(anre) {
        case "@angular/cli":
          angul.angular()
          break;
        case 'react-scripts':
          react.react()
          break;
        case '@vue/cli-service':
          vue.vue();
          break;
        default:
          console.log('Your app need to be created by the Angular CLI or create-react-app or Vue CLI')
      }
    } else {
      console.log('You do not have Angular or React or Vue installed')
    }
    } else {
      console.log('The Program need to run in the same directory as your package.json is in')
    }
}


run()