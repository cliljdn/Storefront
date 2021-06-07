const express = require('express')
const AccountModel = require('../Classes/Account')
const router = express.Router()

router.post('/register/account', async (req, res, next) => {
     const { email, password, account_type } = req.body
     try {
          // let account = new AccountModel

          await AccountModel.insertAccount(req.body)

          res.status(200).json('good')
     } catch (error) {
          next(error)
     }
})

router.post('/login/account', async (req, res, next) => {
     try {
          // let account = new AccountModel

          let auth = await AccountModel.loginUser(req.body)

          res.status(200).json(auth)
     } catch (error) {
          next(error)
     }
})

router.patch('/update/account', async (req, res, next) => {
     try {
          // let account = new AccountModel

          let acc = await AccountModel.updateAccount(req.body)

          res.status(200).json(acc)
     } catch (error) {
          next(error)
     }
})

module.exports = router
