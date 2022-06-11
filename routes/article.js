const express = require('express')
const router = express.Router()
const articleController = require('../controllers/article.js')
var multer = require('multer')

const storage = multer.diskStorage({
  //保存路径
  destination: function (req, file, cb) {
    cb(null, 'public/images')
    //注意这里的文件路径,不是相对路径，直接填写从项目根路径开始写就行了
  },
  //保存在 destination 中的文件名
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'.jpg')
  }
})
const upload = multer({ storage: storage })

//登陆
router.get('/articleList', articleController.getArticleList)
router.get('/single/:id', articleController.getSingleArticle)
router.post('/add', articleController.addArticle)
router.post('/update', articleController.updateArticle)
router.post('/delete', articleController.deleteArticle)

router.post(
  '/getImgUrl',
  upload.array('fileList'),
  articleController.getImgUrl
)
module.exports = router
