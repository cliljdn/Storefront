const Cart = require('./Cart')
const TransactionModel = require('../../Models/Schemas/TransactionSchema')
module.exports = class Transactions extends Cart {
     /* 
     STATIC METHODS
   */

     static get trnsModel() {
          return TransactionModel
     }

     static async userTransactions(id) {
          const profile = await this.getProfile(id)
          console.log(profile)
          return await this.trnsModel
               .where('buyer', profile._id)
               .populate({
                    path: 'item',
                    populate: {
                         path: 'items',
                         populate: {
                              path: 'owner',
                         },
                    },
               })
               .populate({
                    path: 'item',
                    populate: {
                         path: 'customer',
                    },
               })
     }

     static async checkout(obj) {
          /* 
               EXPECTED PROP OF OBJ
               token, payment,cart[] (ids of cart), seller[] (ids)
          */

          const accID = await this.decodeToken(obj.token)

          const profile = await this.getProfile(accID)

          const cart = await this.getCartByIds(obj.cart)

          // total can be done in the frontend before sending the payload
          const total = cart.reduce((acc, t) => acc + t.items.price, 0)

          const change = obj.payment - total

          const transactions = await this.trnsModel.create({
               payment: obj.payment,
               total: total,
               change: change,
          })

          await Promise.all(
               cart.map(async (k) => {
                    k.items.quantity = k.items.quantity - k.quantity

                    transactions.item.push(k._id)
                    transactions.seller.push(k.items.owner)

                    k.checkout = true

                    await k.save()

                    await k.items.save()

                    return {
                         _id: k.items.id,
                         quantity: k.quantity,
                    }
               })
          )

          transactions.buyer = { ...profile }

          return await transactions.save()
     }
}
