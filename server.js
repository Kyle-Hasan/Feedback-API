require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error)=> console.log(error))
db.once('open', ()=> console.log('connected to database'))

//alows express to use json
app.use(cors())
app.use(express.json())

const subscribersRouter = require('./routes/feedback')
app.use('/feedback', subscribersRouter)

app.listen(3000, ()=> console.log("server started"))