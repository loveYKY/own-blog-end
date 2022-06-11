const express = require('express')
const router = express.Router()
const cateController = require('../controllers/cate.js')

//登陆
router.get('/cateList', cateController.getCateList)
router.get('/cateInfo/:id', cateController.getSingleInfo)
router.post('/add', cateController.addCate)
router.post('/update', cateController.updateCate)
router.post('/delete', cateController.deleteCate)
module.exports = router
