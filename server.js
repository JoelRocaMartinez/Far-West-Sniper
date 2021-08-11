const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

const app = express()


//here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/dist')))

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
    res.sendFile(path.join(__dirname, '/dist/index.html'))
})

const port = process.env.PORT || 8080
app.listen(port)
console.log(`app is listening on port: ${port}`)

// require('dotenv').config()
// const express = require('express')
// const mongoose = require('mongoose')
// const path = require('path')


// // step 1
// const app = express()
// const PORT = process.env.PORT || 8080 


// const highScoresRouter = require('./server/routes/highscores')


// // step 2
// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

// mongoose.connection.on('connected', () => {
//     console.log('mongoose is connected')
// })

// // data parsing
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

// // routes
// app.use('/', highScoresRouter)


// //step 3
// if(process.env.NODE_ENV === 'production') {
//     app.use(express.static('dist'))
// }

// app.listen(PORT, console.log(`server is starting at ${PORT}`))