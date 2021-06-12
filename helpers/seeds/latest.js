require('dotenv').config()
require('../../Dependencies/Connection')

const account = require('./01-accounts')
const inventory = require('./02-inventory')

const seed = async () => {
     try {
          const accUp = await account.up()
          const invUp = await inventory.up()

          if (accUp && invUp) {
               console.log('Process run the latest migration')
               process.exit()
          } else {
               console.log('Process already executed the latest migration')
               process.exit()
          }
     } catch (error) {
          console.log(error)
          process.exit()
     }
}

seed()
