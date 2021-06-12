require('../../Dependencies/Connection')

const account = require('./01-accounts')
const inventory = require('./02-inventory')

const rollback = async () => {
     try {
          const accDown = await account.down()
          const invDown = await inventory.down()

          if (accDown && invDown) {
               console.log('Process rolledback the migration')
               process.exit()
          } else {
               console.log('Process is already at the base migration')
               process.exit()
          }
     } catch (error) {
          console.error(error)
          process.exit()
     }
}

rollback()
