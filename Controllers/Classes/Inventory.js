const jwt = require('../../helpers/token/jwt')
const AccountModel = require('../../Models/Schemas/AccountSchema')
const InventoryModel = require('../../Models/Schemas/InventorySchema')
const Account = require('./Account')
const mongoose = require('mongoose')

module.exports = class Inventory extends Account {
     /* 
          
   */
     static async getInventory(obj) {
          const id = await this.decodeToken(obj.token)

          const query = {}

          delete obj.token
          if (obj.itemType) {
               query['itemType'] = obj.itemType
          }

          if (obj.search) {
               query['item_name'] = { $regex: '.*' + obj.search + '.*' }
          }

          return await InventoryModel.find(query).where('item_owner', id).lean()
     }

     /* 
          SET ITEM === ADD ITEM
     */

     static async setItem(obj, token) {
          const decodedToken = await this.decodeToken(token)

          const objectID = mongoose.Types.ObjectId(decodedToken)

          const account = await AccountModel.findById(objectID)

          const inventory = await InventoryModel.create(obj)

          account.inventories.push(inventory)
          const accOk = await account.save()

          inventory.item_owner = { ...account }
          const invOk = await inventory.save()

          return accOk && invOk ? true : false
     }

     /* 
          UPDATE ITEM INCLUDES:
          SETTING THE QUANTITY AND RENAMING A SPECIFIC OBJECT
     */
     static async updateItem(obj, token) {
          Object.keys(obj).forEach((key) => obj[key] === '' && delete obj[key])

          await this.decodeToken(token)

          const objectID = mongoose.Types.ObjectId(obj.item_id)

          const itemData = await InventoryModel.updateOne(
               { _id: objectID },
               obj,
               { new: true }
          )

          return itemData
     }
}
