const AccountModel = require('../../Models/Schemas/AccountSchema')
const InventoryModel = require('../../Models/Schemas/InventorySchema')
const Profile = require('./Profile')
const query = {}

module.exports = class Inventory extends Profile {
     /* 
          
   */

     static get inventoryModel() {
          return InventoryModel
     }

     static async getAccountInventories(obj) {
          const id = await this.decodeToken(obj.token)

          const profile = await this.getProfile(id)

          delete obj.token
          if (obj.itemType) {
               query['itemType'] = obj.itemType
          }

          if (obj.search) {
               query['item_name'] = { $regex: '.*' + obj.search + '.*' }
          }

          return await InventoryModel.find(query)
               .where('owner', profile._id)
               .lean()
     }

     static async getSales() {
          try {
               return await InventoryModel.find({ onTransact: true })
          } catch (error) {
               console.log(error)
          }
     }

     static async InventoryfindByIds(ids) {
          try {
               return await InventoryModel.find({ _id: { $in: ids } })
          } catch (error) {
               console.log(error)
          }
     }

     static async InventoryfindById(id) {
          try {
               return await InventoryModel.find({ _id: id })
          } catch (error) {
               console.log(error)
          }
     }

     /* 
          SET ITEM === ADD ITEM
     */

     static async setItem(obj, token) {
          const decodedToken = await this.decodeToken(token)

          const objectID = this.getObjectID(decodedToken)

          const profile = await this.getProfile(objectID)

          const inventory = await InventoryModel.create(obj)

          inventory.owner = { ...profile }
          const invOk = await inventory.save()

          return invOk ? true : false
     }

     /* 
          UPDATE ITEM INCLUDES:
          SETTING THE QUANTITY AND RENAMING A SPECIFIC OBJECT
     */
     static async updateItem(obj, token) {
          Object.keys(obj).forEach((key) => obj[key] === '' && delete obj[key])

          await this.decodeToken(token)

          const objectID = this.getObjectID(obj.item_id)

          const itemData = await InventoryModel.updateOne(
               { _id: objectID },
               obj,
               { new: true }
          )

          return itemData
     }
}
