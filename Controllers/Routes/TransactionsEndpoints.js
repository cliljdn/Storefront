const express = require('express')
const router = express.Router()

/* 

    EXPECTED BODY: 
     payment, change, quantity, buyer (id), item(array of item ids), seller (account id of seller)




     item_owner

*/

router.get('/transactions/sales', async (req, res, next) => {
     try {
     } catch (error) {
          next(error)
     }
})

module.exports = router
