const express = require('express')
const AccountModel = require('../Classes/Account')
const router = express.Router()

/*
 POSSIBLE ACCOUNT TYPES: Customer, Seller, Admin
*/

router.post('/account/register', async (req, res, next) => {
     // const { email, password, account_type } = req.body
     try {
          await AccountModel.insertAccount(req.body)

          res.status(200).json('good')
     } catch (error) {
          next(error)
     }
})

router.post('/account/login', async (req, res, next) => {
     try {
          let auth = await AccountModel.loginUser(req.body)

          res.status(200).json(auth)
     } catch (error) {
          next(error)
     }
})

router.patch('/account/update', async (req, res, next) => {
     try {
          const rawToken = req.headers['authorization']

          let acc = await AccountModel.updateAccount(req.body, rawToken)

          res.status(200).json(acc)
     } catch (error) {
          next(error)
     }
})

module.exports = router
