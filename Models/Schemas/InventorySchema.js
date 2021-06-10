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
          item_description: dataType,
          quantity: { type: Integer, require: true, default: 0 },
          size: {
               type: String,
               default: null,
          },

          image: {
               type: Buffer,
               content_type: String,
          },

          onTransact: { type: Boolean, default: false },
     },

     {
          timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
     }
)

module.exports = mongoose.model(collectionNames.Inventory, schema)
