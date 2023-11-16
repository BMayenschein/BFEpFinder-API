const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')


router.post('/findEpisodes', homeController.findEpisodes)
router.get('/findEpisodes', homeController.test)


module.exports = router