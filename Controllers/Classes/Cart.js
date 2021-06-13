const Inventory = require('./Inventory')

module.exports = class Cart extends Inventory {
     // STATIC METHODS!!!
     static async addToCart(cart) {
          let itemIds = cart.items.map((k) => this.getObjectID(k._id))

          const id = await this.decodeToken(cart.token)

          const account = await this.getAccountById(id)

          const items = await this.findByIds(itemIds)

          items.map(async (k) => {
               const requested_items = cart.items.find((el) => {
                    return this.getObjectID(el._id).equals(
                         this.getObjectID(k._id)
                    )
               })

               k.quantity -= requested_items.quantity

               await k.save()
          })

          return await items
     }
}
