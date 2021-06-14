const InventorySchema = require('../../Models/Schemas/InventorySchema')

let data = [
     {
          item_name: 'Nike Shoes',
          item_description: 'L',
          quantity: 100,
          price: 500,
          itemType: 'Shoes',
          expiredDate: '06-30-2021',
          onTransact: false,
     },

     {
          item_name: 'Adidas Shirt',
          item_description: 'tnagina',
          quantity: 100,
          price: 300,
          itemType: 'Clothes',
          expiredDate: '06-25-2021',
          onTransact: false,
     },

     {
          item_name: 'LV Bag',
          item_description: 'tnagina',
          quantity: 100,
          price: 400,
          itemType: 'Bag',
          expiredDate: '06-26-2021',
          onTransact: false,
     },
]

exports.up = async () => {
     let exists = await InventorySchema.find()

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
