const jwt = require('../../helpers/token/jwt')
const AccountModel = require('../../Models/Schemas/AccountSchema')
const InventoryModel = require('../../Models/Schemas/InventorySchema')
const Account = require('./Account')
const mongoose = require('mongoose')

module.exports = class Inventory extends Account {
     static async getInventory(token) {
          const id = await this.decodeToken(token)

          const inventoryList = await AccountModel.findById(id)
               .populate('inventories')
               .lean()

          return inventoryList.inventories
     }

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
