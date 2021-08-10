require('dotenv').config()

const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const highScoresRouter = require('./routes/highscores')


app.use(cors());



//connection to db
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to database'))

app.use(express.json())

// API
app.use('/', highScoresRouter);


app.listen(5050., () => console.log("Server Running"))

