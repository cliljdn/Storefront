require('dotenv').config()
require('../../Dependencies/Connection')

const account = require('./01-accounts')
const inventory = require('./02-inventory')
const profile = require('./03-profile')
const cart = require('./04-cart')
const transactions = require('./05-transactions')

const seed = async () => {
     try {
          const accUp = await account.up()
          const invUp = await inventory.up()

          const profileUp = await profile.up()

          /* 
               there's no data to seed thats why i 
               didnt assigned it to a variable
          */
          await cart.up()

          await transactions.up()

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
