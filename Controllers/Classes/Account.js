const AccountModel = require('../../Models/Schemas/AccountSchema')
const bcrypt = require('bcrypt')
const jwt = require('../../helpers/token/jwt')
const mongoose = require('mongoose')

module.exports = class Account {
     //static methods
     static async insertAccount(obj) {
          const ifExist = await AccountModel.findOne({ email: obj.email })
          if (ifExist) throw new Error('Email Already Exist')

          obj.password = await bcrypt.hashSync(obj.password, 10)

          return await AccountModel.create(obj)
     }

     static async loginUser(obj) {
          const account = await AccountModel.findOne({
               email: obj.email,
          })

          if (!account) throw new Error('Account Does not Exist')

          let isPasswordCorrect = await bcrypt.compareSync(
               obj.password,
               account.password
          )

          if (!isPasswordCorrect) throw new Error('Wrong Password')

          let token = await jwt.sign({ id: account._id })
          account.token = token

          return this.getCredentials(account)
     }

     static getCredentials(obj) {
          if (obj.account_type === 'Customer') {
               return {
                    token: obj.token,
                    token_name: `${obj.account_type}-${obj._id}`,
                    auth: true,
                    profile: obj.profile ? obj.profile._doc : null,
               }
          } else if (obj.account_type === 'Seller') {
               return {
                    token: obj.token,
                    token_name: `${obj.account_type}-${obj._id}`,
                    auth: true,
                    profile: obj.profile ? obj.profile._doc : null,
               }
          } else {
               return {
                    token: obj.token,
                    token_name: `${obj.account_type}-${obj._id}`,
                    auth: true,
                    profile: obj.profile ? obj.profile._doc : null,
               }
          }
     }

     static async updateAccount(obj, token) {
          let decodedToken = await this.decodeToken(token)

          const ifExist = await AccountModel.findOne({ email: obj.email })

          if (ifExist) throw new Error('Email Already Exist')

          let objectID = this.getObjectID(decodedToken)

          if ('password' in obj) {
               obj.password = await bcrypt.hashSync(obj.password, 10)
          }

          let userData = await AccountModel.updateOne({ _id: objectID }, obj)

          return userData
     }

     static async decodeToken(token) {
          const auth = token
          if (!auth) throw new Error('No Token Provided')

          const { id } = await jwt.verify(auth)

          if (id) return id
     }

     static async getAccountById(id) {
          return await AccountModel.findById(id)
     }

     static getObjectID(id) {
          return mongoose.Types.ObjectId(id)
     }
}
