require('dotenv').config()

let mongoose = require('mongoose')
require('../helpers/Constants/collectionNames')

const server = process.env.SERVER // REPLACE WITH YOUR DB SERVER
const database = process.env.DATABASE // REPLACE WITH YOUR DB NAME

// db models

mongoose.connect(`mongodb://${server}/${database}`, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
})

mongoose.connection.once('open', () => {
     console.log('Connected')
})

mongoose.connection.on(
     'error',
     console.error.bind(console, 'connection error:')
)
