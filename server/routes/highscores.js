const express = require('express')
const router = express.Router()
const HighScore = require('../models/highscore')

// get all highscores
router.get('/', async (req, res) => {
    try {
        const highscores = await HighScore.find()
        res.json(highscores)
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

// create a highscore
router.post('/', async (req, res) => {
    const score = new HighScore({
        score: req.body.score
    })

    console.log('score:', score)

    try {
        const newScore = await score.save()
        res.status(201).json(newScore)

        console.log('newScore:', newScore)

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
    

module.exports = router