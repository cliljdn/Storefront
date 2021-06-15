const express = require('express')
const Cart = require('../Classes/Cart')
const router = express.Router()

router.post('/cart/add', async (req, res, next) => {
     try {
          const rawToken = req.headers['authorization']

          req.body.token = rawToken

          const cart = await Cart.addToCart(req.body)

          res.status(200).json(cart)
     } catch (error) {
          next(error)
     }
})

router.get('/cart/list', async (req, res, next) => {
     try {
          const rawToken = req.headers['authorization']

          const decoded = await Cart.decodeToken(rawToken)

          const cart = await Cart.getCart(decoded)

          res.status(200).json(cart)
     } catch (error) {
          next(error)
     }
})

router.delete('/cart/remove', async (req, res, next) => {
     try {
          const rawToken = await req.headers['authorization']

          req.body.token = rawToken

          const d = await Cart.removeCartItems(req.body)

          res.status(200).json(d)
     } catch (error) {
          next(error)
     }
})

module.exports = router
