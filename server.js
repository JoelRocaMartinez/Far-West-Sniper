require('dotenv').config()
const express = require("express")
const app = express()
const cors = require('cors')
const path = require('path')
const serveStatic = require('serve-static')

const mongoose = require('mongoose')
//connection to db
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to database'))


app.use(express.json())
app.use(cors());
app.use(serveStatic(__dirname = '/dist'))


const highScoresRouter = require('./routes/highscores')
app.use('/', highScoresRouter);

const port = process.env.PORT || 3000

app.listen(port, () => console.log("Server Running"))


