const file = require('../files');
const chalk = require('chalk')
const fs = require('fs-extra');
const spawn = require('cross-spawn');
const enquirer = require('../enquirer')

module.exports = {
    angular: async () => {
        try {
            console.log('This program will install ng-tailwindcss, tailwindcss, and purgecss\n' +
                'It will make a backup copy of the package.json file.\n' +
                'It will copy the ng-tailwindcss and tailwindcss configtuion files to your app')
            const YesorNo = await enquirer.yesorno();
            if (YesorNo.proceed === 'yes') {
                // Copy Tailwindcss configuration file copy to the working directory
                await fs.copy(
                    `${file.angularPath()}/tailwind.js`,
                    `${file.currentPath()}/tailwind.config.js`
                );
                console.log('tailwind config file was copy sucessfully');
                // Copy the tailwind CSS file copy to the working directory
                await fs.copy(
                    `${file.angularPath()}/tailwind.css`,
                    `${file.currentPath()}/src/tailwind.css`
                );
                console.log('tailwind css file was copy sucessfully');
                // Copy Ng-tailwind configuration file copy to the working directory
                await fs.copy(
                    `${file.angularPath()}/ng-tailwind.js`,
                    `${file.currentPath()}/ng-tailwind.js`
                );
                // Backup you package.json file
                await fs.copy(
                    `${file.currentPath()}/package.json`,
                    `${file.currentPath()}/package.old.json`,
                )
                // Edited the package.json file to add ng-tailwind configuretion
                const fare = await fs.readFile(
                    `${file.currentPath()}/package.json`,
                    'utf8'
                );
                const fare1 = fare.includes('ngtw')
                if (!fare1) {
                    const package = await fs.readFile(
                        `${file.currentPath()}/package.json`,
                        'utf8'
                    );
                    const res1 = package.replace('"ng": "ng",', '"ng": "ng",\n "prestart": "ngtw build",')
                    const res2 = res1.replace('ng serve', 'ng serve & ngtw watch');
                    const res3 = res2.replace('ng build', 'ngtw build --purge && ng build --prod --build-optimizer');
                    await fs.writeFile(`${file.currentPath()}/package.json`, res3);
                    console.log('Edited packagejson sucessfull');
                } else {
                    console.log('Your file package.json file is already been Edited')
                }
                await getStyle()
                console.log(chalk.bgGreen('This will install tailwindcss, ng-tailwindcss, purgecss and their dependencies'))
                // Run to install packages ether in yarn or npm.
                const pack = await enquirer.packagemanager()
                if (pack.manager === 'yarn') {
                    const cmd = spawn(
                        'yarn',
                        [
                            'add',
                            'tailwindcss',
                            '@fullhuman/postcss-purgecss',
                            'ng-tailwindcss',
                            '-D',
                        ], {
                            cwd: `${file.currentPath()}`
                        }
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
                            '@fullhuman/postcss-purgecss',
                            'ng-tailwindcss',
                            '--save-dev',
                        ], {
                            cwd: `${file.currentPath()}`
                        }
                    );
                    cmd.stdout.on('data', (data) => {
                        console.log(`${data}`);
                    });
                    cmd.stderr.on('data', (data) => {
                        console.log(`Error ${data}`);
                    });
                    cmd.on('close', (code) => {
                        console.log('Packages installed Sucessfully\n' +
                            chalk.bgRed.bold('To Start the server type npm start and to build the app type npm run build'));
                    });
                }
            } else if (YesorNo.proceed === 'no') {
                console.log('You choosed not to proceed')
            }
        } catch (err) {
            console.log(err);
        }
    },
}

const getStyle = async () => {
        try {
            // Find out what type of style is in Angular
            const dist = await fs.readdir(`${file.currentPath()}/src/`)
            const conv = dist.toString()
            const wstyle = conv.match(/\b(\w*styles.\w*)\b/g)
            const conv1 = wstyle.toString()
            if (conv1 === 'styles.scss') {
                styleSCSS()
            } else if (conv1 === 'styles.sass') {
                styleSASS()
            } else if (conv1 === 'styles.css') {
                styleCSS()
            }
        } catch (error) {
            console.log(error)
        }
    },

    styleSCSS = async () => {
            try {
                const file1 = await fs.readFile(`${file.currentPath()}/ng-tailwind.js`, 'utf8')
                const file2 = file1.replace('src/styles.css', 'src/styles.scss')
                await fs.writeFileSync(`${file.currentPath()}/ng-tailwind.js`, file2)
                console.log('Edited ng-tailwind for SCSS')
            } catch (error) {
                console.log(error)
            }
        },

        styleSASS = async () => {
                try {
                    const file1 = await fs.readFile(`${file.currentPath()}/ng-tailwind.js`, 'utf8')
                    const file2 = file1.replace('src/styles.css', 'src/styles.sass')
                    const file3 = file2.replace('sass: false,', 'sass: true,')
                    await fs.writeFileSync(`${file.currentPath()}/ng-tailwind.js`, file3)
                    console.log('Edited ng-tailwind for SASS')
                } catch (error) {
                    console.log(error)
                }
            },

            styleCSS = () => {
                return console.log('You App is using CSS style')
            }