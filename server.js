const express = require('express')
const app = express()
require('dotenv').config({ path: './config/.env' })
const db = require('./models')
const apiRoute = require('./routes/routes')
app.use(express.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', apiRoute)

db.sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => { console.log(`app listen in port ${process.env.PORT}`) })
})
