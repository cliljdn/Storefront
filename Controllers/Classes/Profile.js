const AccountSchema = require('../../Models/Schemas/AccountSchema')
const ProfileModel = require('../../Models/Schemas/ProfileSchema')
const Account = require('./Account')

module.exports = class Profile extends Account {
     //STATIC METHODS

     static async accountAuth(token) {
          return await Account.decodeToken(token)
     }

     static async getIdentifiers(id) {
          return await Profile.getAccount(id)
     }

     static async createProfile(obj, token) {
          const decodedID = await this.accountAuth(token)

          const account = await this.getIdentifiers(decodedID)

          const profile = await ProfileModel.create(obj)
          console.log(profile)

          account.profile = { ...profile }
          await account.save()

          return await this.getIdentifiers(decodedID)
     }

     static async updateProfile(obj, token) {
          const decodedID = await this.accountAuth(token)

          const account = await this.getIdentifiers(decodedID)

          await ProfileModel.updateOne(
               { _id: account.profile._id },
               obj
          ).populate('profile')

          return await this.getIdentifiers(decodedID)
     }
}
