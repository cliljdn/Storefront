const Inventory = require('./Inventory')

module.exports = class Cart extends Inventory {
     // STATIC METHODS!!!
     static async addToCart(cart) {
          let itemIds = cart.items.map((k) => k._id)

          const id = await this.decodeToken(cart.token)

          const account = await this.getAccountById(id)

          const items = await this.findByIds(itemIds)

          console.log(items)
     }
}
