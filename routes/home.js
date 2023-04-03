const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('home-test', {
        welcomeMessage: "Tu sei benvenuto nella casa blu!"
    })
})

module.exports = router