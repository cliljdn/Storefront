const Inventory = require('./Inventory')
const CartModel = require('../../Models/Schemas/CartSchema')
module.exports = class Cart extends Inventory {
     // STATIC METHODS!!!
     static async addToCart(cart) {
          /* 
               CART EXPECTED PROP:
               {token, _id, quantity}
          */

          const { token } = cart,
               itemID = { _id: cart._id },
               payload = { quantity: cart.quantity }

          const decoded = await this.decodeToken(token)

          const account = await this.getAccountById(decoded)

          delete cart.token
          const db = await CartModel.create(payload)

          db.account = { ...account }
          db.items = { ...itemID }

          return await db.save()
     }

     static async getCart(id) {
          /* 
               PARAMETER ID = ACCOUNT ID
          */
          return await CartModel.find().where('account', id).populate('items')
     }
}
