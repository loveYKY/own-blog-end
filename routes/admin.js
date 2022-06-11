const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin.js')

router.get('/adminList', adminController.getAdminList)
router.get('/single/:id', adminController.getSingleAdmin)
router.post('/add', adminController.addAdmin)
router.post('/update', adminController.updateAdmin)
router.post('/delete', adminController.deleteAdmin)
router.get('/userInfo', adminController.getUserBytoken)
module.exports = router
