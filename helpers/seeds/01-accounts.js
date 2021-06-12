const bcrypt = require('bcrypt')
const AccountModel = require('../../Models/Schemas/AccountSchema')
let password = bcrypt.hashSync('Password1', 10)

let data = [
     {
          email: 'calil@gmail.com',
          password: password,
          account_type: 'Customer',
     },

     {
          email: 'jaudian@gmail.com',
          password: password,
          account_type: 'Seller',
     },

     {
          email: 'christopher@gmail.com',
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
               if (inserted) return true
          } else {
               return false
          }
     } catch (error) {
          console.error(error)
     }
}

exports.down = async () => {
     try {
          let exists = await AccountModel.find()

          if (exists.length > 0) {
               let deleted = await AccountModel.deleteMany()

               if (deleted) return true
          } else {
               return false
          }
     } catch (error) {
          console.error(error)
     }
}
