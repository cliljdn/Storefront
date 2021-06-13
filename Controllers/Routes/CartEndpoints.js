const express = require('express')
const Cart = require('../Classes/Cart')
const router = express.Router()

router.post('/cart/add', async (req, res, next) => {
     try {
          const rawToken = req.headers['authorization']

          req.body.token = rawToken

          console.log(req.body)
          await Cart.addToCart(req.body)
     } catch (error) {
          next(error)
     }
})

module.exports = router
