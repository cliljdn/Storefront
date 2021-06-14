require('../../Dependencies/Connection')

const account = require('./01-accounts')
const inventory = require('./02-inventory')
const profile = require('./03-profile')

const rollback = async () => {
     try {
          const accDown = await account.down()
          const invDown = await inventory.down()
          const profileUp = await profile.down()

          if (accDown && invDown && profileUp) {
               console.log('Process Rolledback The Migration')
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
