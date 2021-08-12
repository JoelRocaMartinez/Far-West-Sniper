const mongoose = require('mongoose')

const highScoreSchema = new mongoose.Schema({
    score: {
        type: String
    }
})

module.exports = mongoose.model('Highscore', highScoreSchema)