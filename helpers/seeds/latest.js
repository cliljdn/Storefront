require('dotenv').config()
require('../../Dependencies/Connection')

const account = require('./01-accounts')
const inventory = require('./02-inventory')
const profile = require('./03-profile')

const seed = async () => {
     try {
          const accUp = await account.up()
          const invUp = await inventory.up()

          const profileUp = await profile.up()

          if (accUp && invUp && profileUp) {
               console.log('Process Executed the Latest Migration')
               process.exit()
          } else {
               console.log('Process Already Executed The Latest Migration')
               process.exit()
          }
     } catch (error) {
          console.log(error)
          process.exit()
     }
}

seed()
