const express = require('express')
const Transactions = require('../Classes/Transactions')
const router = express.Router()

/* 

    EXPECTED BODY: 
     payment, change, quantity, buyer (id), item(array of item ids), seller (account id of seller)




     item_owner

*/

router.get('/transactions/history', async (req, res, next) => {
     try {
          const rawToken = req.headers['authorization']

          const id = await Transactions.decodeToken(rawToken)

          const d = await Transactions.userTransactions(id)

          res.status(200).json(d)
     } catch (error) {
          next(error)
     }
})

router.post('/transactions/checkout', async (req, res, next) => {
     try {
          const rawToken = req.headers['authorization']

          req.body.token = rawToken

          const d = await Transactions.checkout(req.body)

          res.status(200).json(d)
     } catch (error) {
          next(error)
     }
})

module.exports = router
