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
                    type: mongoose.Schema.Types.ObjectId,
                    ref: collectionNames.Inventory,
                    date_added: {
                         currentTime: () => Math.floor(Date.now() / 1000),
                    },
               },
          ],

          transactions: [
               {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: collectionNames.Inventory,
                    date_bought: {
                         currentTime: () => Math.floor(Date.now() / 1000),
                    },
               },
          ],
     },
     {
          timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
     }
)

module.exports = mongoose.model(collectionNames.Accounts, schema)
