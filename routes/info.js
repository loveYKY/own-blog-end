const express = require('express')
const router = express.Router()
const infoController = require('../controllers/info.js')

router.get('/', infoController.getInfo)
router.post('/update', infoController.updateInfo)

module.exports = router