const mongoose = require('mongoose')
const collectionNames = require('../../helpers/Constants/collectionNames')
const { Schema } = mongoose

const schema = new Schema({
     firstname: String,
     lastname: String,
     contact_number: String,
     address: String,
     birthday: Date,
     gender: {
          type: String,
          enum: ['Male', 'Female'],
          default: '',
     },

     image: {
          type: Buffer,
          content_type: String,
     },

     account: {
          type: mongoose.Schema.Types.ObjectId,
          ref: collectionNames.Accounts,
     },
})

module.exports = mongoose.model(collectionNames.Profile, schema)
