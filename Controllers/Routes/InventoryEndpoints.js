const express = require('express')
const Inventory = require('../Classes/Inventory')
const router = express.Router()

/* 
     EXPECTED BODY:
     item_name, item_descripton, quantity, itemType, image (optional),
     
     expiredDate (optional), price, onTransact (boolean true === displays on sales),

     item_owner,
*/

router.post('/inventory/create/item', async (req, res, next) => {
     try {
          const rawToken = req.headers['authorization']

          const inv = await Inventory.setItem(req.body, rawToken)

          if (inv) res.status(200).json('inserted')
     } catch (error) {
          next(error)
     }
})

router.patch('/inventory/update/item', async (req, res, next) => {
     try {
          const rawToken = req.headers['authorization']

          const updatedData = await Inventory.updateItem(req.body, rawToken)

          res.status(200).json(updatedData)
     } catch (error) {
          next(error)
     }
})

router.get('/inventory/items', async (req, res, next) => {
     try {
          const rawToken = req.headers['authorization']
          req.query.token = rawToken

          const items = await Inventory.getAccountInventories(req.query)

          res.status(200).json(items)
     } catch (error) {
          next(error)
     }
})

module.exports = router
