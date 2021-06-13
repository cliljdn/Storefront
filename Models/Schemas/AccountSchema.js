const mongoose = require('mongoose')
const collectionNames = require('../../helpers/Constants/collectionNames')
const { Schema } = mongoose

let dataType = {
     type: String,
     require: true,
}

const schema = new Schema(
     {
          email: dataType,
          password: dataType,
          account_type: { ...dataType, enum: ['Customer', 'Seller', 'Admin'] },
          profile: {
               type: mongoose.Schema.Types.ObjectId,
               ref: collectionNames.Profile,
          },

          cart: [
               {
                    ref: {
                         type: mongoose.Schema.Types.ObjectId,
                         ref: collectionNames.Inventory,
                    },

                    cart_quantity: {
                         type: Number,
                         require: true,
                    },

                    date_added: {
                         type: Date,
                         default: Date.now,
                    },
               },
          ],

          transactions: [
               {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: collectionNames.Inventory,
               },
          ],

          inventories: [
               {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: collectionNames.Inventory,
               },
          ],
     },

     {
          timestamps: true,
     }
)

module.exports = mongoose.model(collectionNames.Accounts, schema)
