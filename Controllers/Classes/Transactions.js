const Cart = require('./Cart')
const TransactionModel = require('../../Models/Schemas/TransactionSchema')
module.exports = class Transactions extends Cart {
     /* 
     STATIC METHODS
   */

     static get trnsModel() {
          return TransactionModel
     }

     static async checkout(obj) {
          /* 
               EXPECTED PROP OF OBJ
               token, payment, quantity,cart[] (ids of cart), seller (id)
          */

          const accID = await this.decodeToken(obj.token)

          const account = await this.getAccountById(accID)

          const cart = await this.getCartByIds(obj.cart)

          // total can be done in the frontend before sending the payload
          const total = cart.reduce((acc, t) => acc + t.items.price, 0)

          console.log(total)
          const change = obj.payment - total

          const transactions = await this.trnsModel.create({
               payment: obj.payment,
               total: total,
               change: change,
          })

          await Promise.all(
               cart.map(async (k) => {
                    k.quantity - k.items.quantity

                    transactions.item.push(k._id)
                    transactions.seller.push(k.items.account)
                    await k.items.save()
               })
          )

          transactions.buyer = { ...account }

          return await transactions.save()
     }
}
