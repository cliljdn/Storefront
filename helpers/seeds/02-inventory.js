const bcrypt = require('bcrypt')
const InventorySchema = require('../../Models/Schemas/InventorySchema')
let password = bcrypt.hashSync('Password1', 10)

let data = [
     {
          item_name: 'kamote',
          item_description: 'tnagina',
          quantity: 5,

          onTransact: false,
     },

     {
          item_name: 'sili',
          item_description: 'tnagina',
          quantity: 5,

          onTransact: false,
     },

     {
          item_name: 'gago',
          item_description: 'tnagina',
          quantity: 5,

          onTransact: false,
     },
]

exports.up = () =>
     InventorySchema.insertMany(data)
          .then(function () {
               console.info('Inventory Seed Inserted')
          })
          .catch(function (e) {
               console.error(e)
          })

exports.down = () =>
     InventorySchema.deleteMany({})
          .then(function () {
               console.info('Account Collection Rolledback')
          })
          .catch(function (e) {
               console.error(e)
          })
