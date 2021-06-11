require('dotenv').config()
require('../../Dependencies/Connection')

const account = require('./01-accounts')
const inventory = require('./02-inventory')

const seed = async () => {
     try {
          await account.up()
          await inventory.up()
          process.exit()
     } catch (error) {
          console.log(error)
     }
}

seed()
