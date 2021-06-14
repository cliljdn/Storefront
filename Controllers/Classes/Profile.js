const AccountSchema = require('../../Models/Schemas/AccountSchema')
const ProfileModel = require('../../Models/Schemas/ProfileSchema')
const Account = require('./Account')

module.exports = class Profile extends Account {
     //STATIC METHODS

     static async createProfile(obj, token) {
          const decodedID = await this.decodeToken(token)

          const account = await this.getAccountById(decodedID)

          console.log(account)
          const profile = await ProfileModel.create(obj)

          profile.account = { ...account }
          await profile.save()

          return await this.getProfile(decodedID)
     }

     static async updateProfile(obj, token) {
          /*
               EXPECTED PARAMETER RAW AUTHORIZATION (JWT) TOKEN, 
               EXPECTED PROP OF OBJ (FIRSTNAME, LASTNAME, ADDRESS)
          */

          const decodedID = await this.decodeToken(token)

          const profile = await this.getProfile(decodedID)

          await ProfileModel.updateOne({ _id: profile._id }, obj)

          return await this.getProfile(decodedID)
     }

     static async getProfile(id) {
          /*
               EXPECTED PARAMETER VERIFIED JWT ID
          */

          return await ProfileModel.findOne({ account: id })
     }
}
