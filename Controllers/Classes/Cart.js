const Inventory = require('./Inventory')

module.exports = class Cart extends Inventory {
     // STATIC METHODS!!!
     static async addToCart(cart) {
          let itemIds = cart.items.map((k) => this.getObjectID(k._id))

          const id = await this.decodeToken(cart.token)

          const account = await this.getAccountById(id)

          const items = await this.findByIds(itemIds)

          const updatedCart = await Promise.all(
               items.map(async (k) => {
                    const requested_items = cart.items.find((el) => {
                         return this.getObjectID(el._id).equals(
                              this.getObjectID(k._id)
                         )
                    })

                    k.quantity -= requested_items.quantity

                    //    k.quantity = 100
                    await k.save()

                    return {
                         _id: this.getObjectID(k._id),
                         cart_quantity: requested_items.quantity,
                         date_added: new Date()
                              .toLocaleString()
                              .split(',')
                              .find(() => true),
                    }
               })
          )

          console.log(updatedCart)
          account.cart.push(...updatedCart)
          await account.save()

          return await items
     }
}
