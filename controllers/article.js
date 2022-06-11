const Common = require('./common.js')
const ArticleModel = require('../models/article.js')
const CateModel = require('../models/cate.js')
const Constant = require('../constant/constant.js')
const moment = require('moment')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
/**
 * 将formData中的图片保存到本地public静态资源中
 */
const getImgUrl = (req, res) => {
  let resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  console.log(req.files)
  let arr = []
  arr = req.files.map(item => {
    return {
      ...item,
      path: '/images/' + item.filename
    }
  })
  resObj.data = arr
  res.json(resObj)
}

/**
 * 获取文章列表
 */
const getArticleList = (req, res) => {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)

  //定义async任务
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.query, ['page', 'pageSize'], cb)
    },
    //查询方法
    query: [
      'checkParams',
      (results, cb) => {
        //设定搜索对象
        let searchOption
        //偏移量
        let offset = req.query.pageSize * (req.query.page - 1) || 0
        //查询条数
        let limit = parseInt(req.query.pageSize) || 20

        let whereCondition = {}
        if (req.query.title) {
          whereCondition = {
            title: {
              // 模糊查询
              [Op.like]: '%' + req.query.title + '%'
            }
          }
          searchOption = {
            where: whereCondition,
            order: [['created_at', 'ASC']],
            include: [
              {
                model: CateModel
              }
            ]
          }
        } else {
          searchOption = {
            offset: offset,
            limit: limit,
            order: [['created_at', 'ASC']],
            include: [
              {
                model: CateModel
              }
            ]
          }
        }
        ArticleModel.findAndCountAll(searchOption)
          .then(resData => {
            if (resData) {
              let list = []
              list = resData.rows.map(item => {
                return {
                  id: item.id,
                  title: item.title,
                  desc: item.desc,
                  cate: item.cate,
                  cateName: item.Cate.name,
                  content: item.content,
                  createdAt: moment(item.createdAt)
                    .utcOffset(8)
                    .format('YYYY/MM/DD HH:mm:ss'),
                  updateAt: moment(item.updateAt)
                    .utcOffset(8)
                    .format('YYYY/MM/DD HH:mm:ss')
                }
              })
              resObj.data = {
                list,
                count: list.length,
                totalCount: resData.count
              }
              cb(null)
            }
          })
          .catch(err => {
            console.log(err)
            cb(Constant.DEFAULT_ERROR)
          })
      }
    ]
  }
  Common.autoFn(tasks, res, resObj)
}

/**
 * 单条文章信息接口
 */
const getSingleArticle = (req, res) => {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)

  //定义async任务
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.params, ['id'], cb)
    },
    //查询方法
    query: [
      'checkParams',
      (results, cb) => {
        //设定搜索对象
        let searchOption = {
          where: {
            id: req.params.id
          },
          include: [
            {
              model: CateModel
            }
          ]
        }

        ArticleModel.findOne(searchOption)
          .then(resData => {
            if (resData) {
              resObj.data = {
                id: resData.id,
                title: resData.title,
                desc: resData.desc,
                cate: resData.cate,
                cateName: resData.Cate.name,
                content: resData.content,
                createdAt: moment(resData.createdAt)
                  .utcOffset(8)
                  .format('YYYY/MM/DD HH:mm:ss'),
                updateAt: moment(resData.updateAt)
                  .utcOffset(8)
                  .format('YYYY/MM/DD HH:mm:ss')
              }
              cb(null)
            } else {
              cb(Constant.ARTICLE_NOT_EXIST)
            }
          })
          .catch(err => {
            console.log(err)
            cb(Constant.DEFAULT_ERROR)
          })
      }
    ]
  }

  Common.autoFn(tasks, res, resObj)
}

/**
 * 添加文章接口
 */

const addArticle = (req, res) => {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)

  //定义async任务
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.body, ['title', 'cate', 'desc', 'content'], cb)
    },
    //查询方法
    add: [
      'checkParams',
      (results, cb) => {
        ArticleModel.create({
          title: req.body.title,
          cate: req.body.cate,
          desc: req.body.desc,
          content: req.body.content
        })
          .then(resData => {
            cb(null)
          })
          .catch(err => {
            console.log(err)
            cb(Constant.DEFAULT_ERROR)
          })
      }
    ]
  }

  Common.autoFn(tasks, res, resObj)
}

/**
 * 修改文章接口
 */

const updateArticle = (req, res) => {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)

  //定义async任务
  let tasks = {
    checkParams: cb => {
      Common.checkParams(
        req.body,
        ['id', 'title', 'cate', 'desc', 'content'],
        cb
      )
    },
    //查询方法
    update: [
      'checkParams',
      (results, cb) => {
        ArticleModel.update(
          {
            title: req.body.title,
            cate: req.body.cate,
            desc: req.body.desc,
            content: req.body.content
          },
          {
            where: {
              id: req.body.id
            }
          }
        )
          .then(resData => {
            if (resData[0]) {
              cb(null)
            } else {
              cb(Constant.ARTICLE_NOT_EXIST)
            }
          })
          .catch(err => {
            console.log(err)
            cb(Constant.DEFAULT_ERROR)
          })
      }
    ]
  }

  Common.autoFn(tasks, res, resObj)
}

/**
 * 删除文章接口
 */

const deleteArticle = (req, res) => {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)

  //定义async任务
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.body, ['id'], cb)
    },
    //查询方法
    delete: [
      'checkParams',
      (results, cb) => {
        ArticleModel.destroy({
          where: {
            id: req.body.id
          }
        })
          .then(resData => {
            if (resData) {
              cb(null)
            } else {
              cb(Constant.ARTICLE_NOT_EXIST)
            }
          })
          .catch(err => {
            console.log(err)
            cb(Constant.DEFAULT_ERROR)
          })
      }
    ]
  }

  Common.autoFn(tasks, res, resObj)
}

const exportObj = {
  getArticleList,
  getSingleArticle,
  addArticle,
  updateArticle,
  deleteArticle,
  getImgUrl
}

module.exports = exportObj
