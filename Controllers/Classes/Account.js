const AccountModel = require('../../Models/Schemas/AccountSchema')
const bcrypt = require('bcrypt')
const jwt = require('../../helpers/token/jwt')
const mongoose = require('mongoose')

module.exports = class Account {
     constructor(obj) {
          Object.keys(obj).map((k) => (this[k] = obj[k]))
     }

     //getters
     get getObjConstructor() {
          return {
               ...this,
          }
     }

     //setters

     //static methods
     static listAccounts() {
          return AccountModel.find({})
     }

     static async insertAccount(obj) {
          const ifExist = await AccountModel.findOne({ email: obj.email })

          if (!ifExist) throw new Error('Email Already Exist')

          obj.password = await bcrypt.hashSync(obj.password, 10)
          AccountModel.create(obj)
     }

     static async loginUser(obj) {
          const ifExist = await AccountModel.findOne({ email: obj.email })

          if (!ifExist) throw new Error('Account Does not Exist')

          let isPasswordCorrect = await bcrypt.compareSync(
               obj.password,
               ifExist.password
          )

          if (!isPasswordCorrect) throw new Error('Wrong Password')

          let token = await jwt.sign({ id: ifExist._id })
          return {
               token: token,
               name: `${ifExist.account_type}-${ifExist._id}`,
               auth: true,
          }
     }

     static async updateAccount(obj) {
          const ifExist = await AccountModel.findOne({ email: obj.email })

          if (ifExist) throw new Error('Email Already Exist')

          let decodeId = await jwt.verify(obj._id)

          let objectID = mongoose.Types.ObjectId(decodeId.id)

          console.log(obj)
          delete obj._id
          let userData = await AccountModel.findByIdAndUpdate(
               { _id: objectID },
               obj
          )

          console.log(userData)

          return userData
     }
}
