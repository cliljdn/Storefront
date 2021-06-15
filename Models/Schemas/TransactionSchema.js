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

          total: {
               type: Number,
               default: 0,
          },

          buyer: {
               type: mongoose.Schema.Types.ObjectId,
               ref: collectionNames.Accounts,
          },

          item: [
               {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: collectionNames.Cart,
               },
          ],

          seller: [
               {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: collectionNames.Accounts,
               },
          ],
     },

     {
          timestamps: true,
     }
)

module.exports = mongoose.model(collectionNames.Transactions, schema)
