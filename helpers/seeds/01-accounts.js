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

exports.up = () =>
     AccountModel.insertMany(data)
          .then(function () {
               console.info('Account Seed Inserted')
          })
          .catch(function (e) {
               console.log(e)
          })

exports.down = () =>
     AccountModel.deleteMany()
          .then(function () {
               console.info('Account Collection Rolledback')
          })
          .catch(function (e) {
               console.log(e)
          })
