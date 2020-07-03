const file = require('../files')
const fs = require('fs-extra')
const chalk = require('chalk')
const enquirer = require('../enquirer')
const spawn = require('cross-spawn')

module.exports = {
    vue: async () => {
        try {
            console.log(
                chalk.greenBright(
                    'Vue was Detected.\n' +
                    'This will copy the tailwindcss config file and install twailwindcss, purgecss, and their dependenies.\n' +
                    'Would You like to Proceed...'
                )
            )
            const YesorNo = await enquirer.yesorno()
            switch(YesorNo.proceed) {
                case 'yes':
                    // Copy Tailwind Config file to your app
                    await fs.copy(
                        `${file.vuePath()}/tailwind.js`,
                        `${file.currentPath()}/tailwind.config.js`
                    )
                    console.log('Tailwind config file was copied succesfully')
                    // Copy PostCSS config file to your app
                    await fs.copy(
                        `${file.vuePath()}/postcss.config.js`,
                        `${file.currentPath()}/postcss.config.js`
                    )
                    console.log('PostCSS config file was copied successfully')
                    // Create the directory that will house the tailwindcss
                    await fs.ensureDir(`${file.currentPath()}/src/assets/styles`)
                    console.log('The directory /assets/styles was created sucessfully')
                    // Copy the tailwindcss file to assets/styles
                    await fs.copy(
                        `${file.vuePath()}/index.css`,
                        `${file.currentPath()}/src/assets/styles/index.css`
                    )
                    console.log('The tailwind CSS file was copied sucessfully')
                    // Edited the main.js file to point to the tailwindcss file
                    const index = await fs.readFile(
                        `${file.currentPath()}/src/main.js`, 'utf8'
                    );
                    const rstdex = index.replace('./App.vue',
                    './App.vue\'\nimport \'./assets/styles/index.css'
                    )
                    await fs.writeFile(`${file.currentPath()}/src/main.js`, rstdex)
                    console.log('Added the import /assets/styles/index.css to the main.js file')
                    // Pick NPM or YARN to install tailwindcss and purgecss
                    const npmyarn = await enquirer.packagemanager()
                    switch(npmyarn.manager) {
                        case 'yarn':
                            const cmdd = spawn(
                                'yarn',
                                [
                                    'add',
                                    'tailwindcss',
                                    'autoprefixer',
                                    '@fullhuman/postcss-purgecss',
                                    '-D'
                                ],
                                { cwd: `${file.currentPath()}` }
                                );
                                cmdd.stdout.on('data', (data) => {
                                  console.log(`${data}`);
                                });
                                cmdd.stderr.on('data', (data) => {
                                  console.log(`Error ${data}`);
                                });
                                cmdd.on('close', (code) => {
                                  console.log('Packages installed Sucessfully');
                                });
                                break;
                        case 'npm':
                            const cmd = spawn(
                                'npm',
                                [
                                    'add',
                                    'tailwindcss',
                                    'autoprefixer',
                                    '@fullhuman/postcss-purgecss',
                                    '-D'
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
                    break
                case 'no':
                    console.log('You choose not to proceed')
            }
        } catch (error) {
            console.log(error)
        }
    }
}
