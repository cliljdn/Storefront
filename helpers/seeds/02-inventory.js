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

const ifExist = data.map((k) => k.item_name)

exports.up = async () => {
     let exists = await InventorySchema.find()
          .where('item_name')
          .in(ifExist)
          .exec()

     if (exists.length <= 0) {
          let inserted = await InventorySchema.insertMany(data)
          if (inserted) return true
     } else {
          return false
     }
}

exports.down = async () => {
     try {
          let exists = await InventorySchema.find()
               .where('item_name')
               .in(ifExist)
               .exec()

          if (exists.length > 0) {
               let deleted = await InventorySchema.deleteMany({})

               if (deleted) return true
          } else {
               return false
          }

          //
     } catch (error) {
          console.error(error)
     }
}
