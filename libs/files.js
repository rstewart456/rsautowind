const fs = require('fs-extra')
const path = require('path')

module.exports = {
    // get current working path
    currentPath: () => {
        return process.cwd()
    },
    //React Configuration files location
    reactPath: () => {
        const path1 = __dirname + '/react/'
        const resolve = fs.realpathSync(path1)
        return resolve
    },
    // Angular Configuration files location
    angularPath: () => {
        const path1 = __dirname + '/angular/'
        const resolve = fs.realpathSync(path1)
        return resolve
    },
    // Check to see if you are in the main directory of package.json
    checkPackage: () => {
        const path = process.cwd()
        const file = `${path}/package.json`
        const truth = fs.existsSync(file)
        return truth
    },
    // Check to see if Angular or React installed in package.json
    checkFrameWork: async () => {
        const cupath = process.cwd()
        const frameWork = await fs.readFile(`${cupath}/package.json`, 'utf8')
        const frame = frameWork.includes('react-scripts') || frameWork.includes('@angular/core') 
        return frame
    },
    angularReact: async () => {
        const curpath = process.cwd()
        const file1 = await fs.readFile(`${curpath}/package.json`, 'utf8')
        const file2 = file1.match(/@angular\/cli/) || file1.match(/react-scripts/)
        const file3 = file2.toString()
        return file3
    }
}