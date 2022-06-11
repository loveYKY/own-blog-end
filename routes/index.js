const express = require('express')
const router = express.Router()
const IndexController = require('../controllers/index.js')

//登陆
router.post('/login', IndexController.login)

module.exports = router
