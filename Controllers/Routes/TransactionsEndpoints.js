const express = require('express')
const router = express.Router()

/* 

    EXPECTED BODY:
     item_name, item_descripton, quantity, itemType, image (optional),
     
     expiredDate (optional), price, onTransact (boolean true === displays on sales),

     item_owner

*/

router.get('/transactions/sales', async (req, res, next) => {
     try {
     } catch (error) {
          next(error)
     }
})

module.exports = router
