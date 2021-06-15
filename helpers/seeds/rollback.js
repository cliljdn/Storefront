require('../../Dependencies/Connection')

const account = require('./01-accounts')
const inventory = require('./02-inventory')
const profile = require('./03-profile')
const cart = require('./04-cart')
const transactions = require('./05-transactions')

const rollback = async () => {
     try {
          const accDown = await account.down()
          const invDown = await inventory.down()
          const profileDown = await profile.down()

          /* 
               there's no data to seed thats why i 
               didnt assigned it to a variable
          */
          const cartDown = await cart.down()
          const transDown = await transactions.down()

          if ((accDown && invDown && profileDown) || (cartDown && transDown)) {
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
