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
               token, payment, change, quantity,  buyer (id), cart[] (ids of cart), seller (id)
          */

          await this.decodeToken(obj.token)

          return await this.getUserCart
     }
}
