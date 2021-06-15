const Inventory = require('./Inventory')
const CartModel = require('../../Models/Schemas/CartSchema')
module.exports = class Cart extends Inventory {
     static get cartModel() {
          return CartModel
     }

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

     static async getUserCart(id) {
          /* 
               PARAMETER ID = ACCOUNT ID (DECODED JWT)
          */
          return await CartModel.find()
               .where('account', id)
               .where('checkout', false)
               .populate('items')
     }

     static async getCartItem(id) {
          return await CartModel.findById(id)
     }

     static async getCartByIds(ids) {
          /* 
               EXPECTED PARAMETER:
               ids[]
          */

          return await this.cartModel
               .find({ _id: { $in: ids } })
               .populate('items')
     }

     static async removeCartItems(obj) {
          /* 
               EXPECTED PARAMETER:
               {
                    ids: Array,
                    token: jwt raw token

               }
          
          */

          await this.decodeToken(obj.token)

          return await CartModel.deleteMany({
               _id: {
                    $in: obj.ids,
               },
          })
     }

     static async updateCartItem(obj) {
          /* 
               EXPECTED PROP OF PARAMETER:
               token, _id, quantity
          
          */
          Object.keys(obj).forEach((key) => obj[key] === '' && delete obj[key])
          await this.decodeToken(obj.token)

          const objID = this.getObjectID(obj._id)

          const updated = await CartModel.updateOne({ _id: objID }, obj, {
               new: true,
          })
     }
}
