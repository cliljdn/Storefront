const mongoose = require('mongoose')
const collectionNames = require('../../helpers/Constants/collectionNames')
const { Schema } = mongoose

let dataType = {
     type: String,
     require: true,
}

const schema = new Schema(
     {
          item_name: dataType,
          item_description: { type: String, default: null },
          quantity: { type: Number, require: true, default: 0 },

          itemType: { type: String, default: null },
          image: {
               type: Buffer,
               content_type: String,
               default: null,
          },

          expiredDate: {
               type: Date,
               default: null,
          },

          price: {
               type: Number,
               default: null,
          },

          onTransact: { type: Boolean, default: false },

          item_owner: {
               type: mongoose.Schema.Types.ObjectId,
               ref: collectionNames.Accounts,
          },
     },

     {
          timestamps: true,
     }
)

module.exports = mongoose.model(collectionNames.Inventory, schema)
