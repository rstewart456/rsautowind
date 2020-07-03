const file = require('../files');
const fs = require('fs-extra');
const chalk = require('chalk')
const enquirer = require('../enquirer')
const spawn = require('cross-spawn');

module.exports = {
  react: async () => {
    try {
      console.log(chalk.greenBright(
        'React was detected.\n' +
        'It will copy and modify tailwindcss craco assets/index.css configuration files to your app\n' +
        'It will install tailwindcss, craco, postcss, autoprefixer, and purgecss to your app.\n' +
        'Would You like to Proceed...'
      ))
      const YesorNo = await enquirer.yesorno()
      if (YesorNo.proceed === "yes") {
      // Copy craco configuration file
      await fs.copy(
        `${file.reactPath()}/craco.config.js`,
        `${file.currentPath()}/craco.config.js`
      );
      console.log('craco conf file was copy sucessfully');
      // Copy Tailwindcss configuration file
      await fs.copy(
        `${file.reactPath()}/tailwind.js`,
        `${file.currentPath()}/tailwind.config.js`
      );
      console.log('tailwind config file was copy sucessfully');
      // Created a copy of your old package.json file
      await fs.copy(
        `${file.currentPath()}/package.json`,
        `${file.currentPath()}/package.backup.json`
      )
      // Create the directory that will house the tailwindcss
      await fs.ensureDir(`${file.currentPath()}/src/assets`);
      console.log('Directive Created Sucessfully');
      // Copy the Tailwindcss file to location
      await fs.copy(
        `${file.reactPath()}/main.css`,
        `${file.currentPath()}/src/assets/main.css`
      );
      console.log('index.css copy sucessfull');
      // Edited the index.js file to use tailwindcss
      const index = await fs.readFile(
        `${file.currentPath()}/src/index.js`,
        'utf8'
      );
      // Edited you index.js file
      const eindex = index.replace('./index.css', './index.css\';\nimport \'./assets/main.css');
      await fs.writeFile(`${file.currentPath()}/src/index.js`, eindex);
      console.log('edit of the index.js file was sucessfull');
      // Edited the package.json file to add craco configuretion
      const package = await fs.readFile(
        `${file.currentPath()}/package.json`,
        'utf8'
      );
      const res = package.replace('react-scripts start', 'craco start');
      const res1 = res.replace('react-scripts build', 'craco build');
      const res2 = res1.replace('react-scripts test', 'craco test');
      await fs.writeFile(`${file.currentPath()}/package.json`, res2);
      console.log('Edited packagejson sucessfull');
      console.log(chalk.bgGreen('This will install autoprefixer, postcss, purgecss, craco and their dependencies'))
      // Run to install packages ether in yarn or npm.
      const pack = await enquirer.packagemanager()
      if (pack.manager === 'yarn') {
        const cmd = spawn(
          'yarn',
          [
            'add',
            'tailwindcss',
            'postcss',
            '@fullhuman/postcss-purgecss',
            'autoprefixer',
            'craco',
            '-D',
          ],
          { cwd: `${file.currentPath()}` }
        );
        cmd.stdout.on('data', (data) => {
          console.log(`${data}`);
        });
        cmd.stderr.on('data', (data) => {
          console.log(`Error ${data}`);
        });
        cmd.on('close', (code) => {
          console.log('Packages installed Sucessfully');
        });
      } else if (pack.manager === 'npm') {
        const cmd = spawn(
          'npm',
          [
            'install',
            'tailwindcss',
            'postcss',
            '@fullhuman/postcss-purgecss',
            'autoprefixer',
            'craco',
            '--save-dev',
          ],
          { cwd: `${file.currentPath()}` }
        );
        cmd.stdout.on('data', (data) => {
          console.log(`${data}`);
        });
        cmd.stderr.on('data', (data) => {
          console.log(`Error ${data}`);
        });
        cmd.on('close', (code) => {
          console.log('Packages installed Sucessfully');
        });
      }
    } else if (YesorNo.proceed === 'no'){
      console.log('You choosed not to proceed')
    }
    } catch (err) {
      console.log(err);
    }
  }
}
