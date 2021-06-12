const express = require('express')
const Inventory = require('../Classes/Inventory')
const router = express.Router()

router.post('/inventory/create/item', async (req, res, next) => {
     try {
          const rawToken = req.headers['authorization']

          const inv = await Inventory.additem(req.body, rawToken)

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

module.exports = router
