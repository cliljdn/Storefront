require('dotenv').config()

require('./Dependencies/Connection')

const express = require('express')
const mongoose = require('mongoose')
const app = express()

// initialize dependencies
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
     res.json({
          message: 'Try',
     })
})

//endpoints
app.use('/api/v1', require('./Controllers/Routes/AccountsEndpoint'))
app.use('/api/v1', require('./Controllers/Routes/ProfileEndpoint'))
app.use('/api/v1', require('./Controllers/Routes/InventoryEndpoints'))
app.use('/api/v1', require('./Controllers/Routes/TransactionsEndpoints'))
app.use('/api/v1', require('./Controllers/Routes/CartEndpoints'))

//middlewares
const { ErrorHandler, notFound } = require('./helpers/errors/Errorhandler')
app.use(ErrorHandler)
app.use(notFound)

//server port
const PORT = process.env.SERVER_PORT || 3500
app.listen(PORT, () => console.log(`app is running on port ${PORT}`))
