require('../../Dependencies/Connection')

const account = require('./01-accounts')
const inventory = require('./02-inventory')

const rollback = async () => {
     await account.down()
     await inventory.down()

     process.exit()
}

rollback()
