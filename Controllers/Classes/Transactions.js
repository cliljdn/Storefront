const Cart = require('./Cart')
const TransactionModel = require('../../Models/Schemas/TransactionSchema')
module.exports = class Transactions extends Cart {
     /* 
     STATIC METHODS
   */

     static get trnsModel() {
          return TransactionModel
     }

     static async userTransactions() {}

     static async checkout(obj) {
          /* 
               EXPECTED PROP OF OBJ
               token, payment, quantity,cart[] (ids of cart), seller[] (ids)
          */

          const accID = await this.decodeToken(obj.token)

          const account = await this.getAccountById(accID)

          const cart = await this.getCartByIds(obj.cart)

          // total can be done in the frontend before sending the payload
          const total = cart.reduce((acc, t) => acc + t.items.price, 0)

          const change = obj.payment - total

          const transactions = await this.trnsModel.create({
               payment: obj.payment,
               total: total,
               change: change,
          })

          const itemInfo = await Promise.all(
               cart.map(async (k) => {
                    transactions.item.push(k._id)
                    transactions.seller.push(k.items.account)

                    k.checkout = true

                    await k.save()

                    return {
                         _id: k.items.id,
                         quantity: k.quantity,
                    }
               })
          )

          const inventories = await this.InventoryfindByIds(
               itemInfo.map((k) => k._id)
          )

          inventories.map(async (k) => {
               const cart = itemInfo.find((el) =>
                    this.getObjectID(el._id).equals(this.getObjectID(k._id))
               )

               k.quantity = k.quantity - cart.quantity

               console.log(k.quantity)
               await k.save()
          })

          transactions.buyer = { ...account }

          return await transactions.save()
     }
}
