const AccountSchema = require('../../Models/Schemas/AccountSchema')
const ProfileModel = require('../../Models/Schemas/ProfileSchema')
const Account = require('./Account')

module.exports = class Profile extends Account {
     //STATIC METHODS

     static async createProfile(obj, token) {
          const decodedID = await this.accountAuth(token)

          const account = await this.getIdentifiers(decodedID)

          const profile = await ProfileModel.create(obj)

          account.profile = { ...profile }
          await account.save()

          return await this.getIdentifiers(decodedID)
     }

     static async updateProfile(obj, token) {
          /*
               EXPECTED PARAMETER RAW AUTHORIZATION (JWT) TOKEN, 
               EXPECTED PROP OF OBJ (FIRSTNAME, LASTNAME, ADDRESS)
          */

          const decodedID = await this.accountAuth(token)

          const account = await this.getIdentifiers(decodedID)

          await ProfileModel.updateOne({ _id: account.profile._id }, obj)

          return await this.getIdentifiers(decodedID)
     }

     //INHERITS PARENT (ACCOUNT) METHOD
     static async accountAuth(token) {
          /*
               EXPECTED PARAMETER RAW AUTHORIZATION (JWT) TOKEN
          */
          return await Profile.decodeToken(token)
     }

     static async getIdentifiers(id) {
          /*
               EXPECTED PARAMETER VERIFIED JWT ID
          */
          return await Profile.getAccountIdentifiers(id)
     }
}
