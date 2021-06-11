const bcrypt = require('bcrypt')
const AccountModel = require('../../Models/Schemas/AccountSchema')
let password = bcrypt.hashSync('Password1', 10)

let data = [
     {
          email: 'hahaha@gmail.com',
          password: password,
          account_type: 'Customer',
     },

     {
          email: 'hehe@gmail.com',
          password: password,
          account_type: 'Seller',
     },

     {
          email: 'gaga@gmail.com',
          password: password,
          account_type: 'Admin',
     },
]

const emails = data.map((k) => k.email)

exports.up = async () => {
     try {
          const exists = await AccountModel.where('email').in(emails).exec()

          if (exists.length <= 0) {
               let inserted = await AccountModel.insertMany(data)
               if (inserted) console.info('Account Seed Inserted')
          } else {
               console.log('Account is already on latest migration')
          }
     } catch (error) {
          console.error(error)
     }
}

exports.down = async () => {
     try {
          let exists = await AccountModel.where('email').in(emails).exec()

          if (exists.length > 0) {
               let deleted = await AccountModel.deleteMany()

               if (deleted) console.log('Account Collection Rolledback')
          } else {
               console.log('Account is already on base migration')
          }
     } catch (error) {
          console.error(error)
     }
}
