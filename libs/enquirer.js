const { prompt } = require('enquirer')

module.exports = {
        // Choose a yes or no answer
        yesorno: async () => {
            const question = await prompt({
            type: 'select',
            name: 'proceed',
            message: 'Choose Yes or No',
            choices: ['yes', 'no']
            })
            return question
        },
        // Choose which package manager you want to use
        packagemanager: async () => {
        const question = await prompt({
            type: 'select',
            name: 'manager',
            message: 'Choose you Package Manager',
            choices: ['npm', 'yarn']
        })
        return question
    }
}