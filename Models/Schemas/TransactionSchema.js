const mongoose = require('mongoose')
const collectionNames = require('../../helpers/Constants/collectionNames')
const { Schema } = mongoose

const schema = new Schema(
     {
          payment: {
               type: Number,
               require: true,
          },

          change: {
               type: Number,
               default: 0,
          },

          quantity: {
               type: Number,
               default: 0,
               require: true,
          },

          buyer: {
               type: mongoose.Schema.Types.ObjectId,
               ref: collectionNames.Accounts,
          },

          item: [
               {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: collectionNames.Inventory,
               },
          ],

          seller: {
               type: mongoose.Schema.Types.ObjectId,
               ref: collectionNames.Accounts,
          },
     },

     {
          timestamps: true,
     }
)

module.exports = mongoose.model(collectionNames.Transactions, schema)
