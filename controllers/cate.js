const Common = require('./common.js')
const CateModel = require('../models/cate.js')
const Constant = require('../constant/constant.js')
const moment = require('moment')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
/**
 * 获取分类列表
 */
const getCateList = (req, res) => {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)

  //定义async任务
  let tasks = {
    checkParams: cb => {
      //如果传入dropList则跳过分页逻辑
      if (req.query.dropList) {
        cb(null)
      } else {
        Common.checkParams(req.query, ['page', 'pageSize'], cb)
      }
    },
    //查询方法
    query: [
      'checkParams',
      (results, cb) => {
        //设定搜索对象
        let searchOption
        if (req.query.dropList) {
          searchOption = {
            order: [['created_at', 'ASC']]
          }
        } else {
          //偏移量
          let offset = req.query.pageSize * (req.query.page - 1) || 0
          //查询条数
          let limit = parseInt(req.query.pageSize) || 20

          let whereCondition = {}
          if (req.query.name) {
            whereCondition = {
              name: {
                // 模糊查询
                [Op.like]: '%' + req.query.name + '%'
              }
            }
            searchOption = {
              where: whereCondition,
              order: [['created_at', 'ASC']],
            }
          } else {
            searchOption = {
              offset: offset,
              limit: limit,
              order: [['created_at', 'ASC']]
            }
          }
        }
        CateModel.findAndCountAll(searchOption)
          .then(resData => {
            if (resData) {
              let list = []
              list = resData.rows.map(item => {
                return {
                  id: item.id,
                  name: item.name,
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
 * 单条分类信息接口
 */
const getSingleInfo = (req, res) => {
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
          }
        }

        CateModel.findOne(searchOption)
          .then(resData => {
            if (resData) {
              resObj.data = {
                id: resData.id,
                name: resData.name,
                createdAt: moment(resData.createdAt)
                  .utcOffset(8)
                  .format('YYYY/MM/DD HH:mm:ss'),
                updateAt: moment(resData.updateAt)
                  .utcOffset(8)
                  .format('YYYY/MM/DD HH:mm:ss')
              }
              cb(null)
            } else {
              cb(Constant.CATE_NOT_EXIST)
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
 * 添加分类接口
 */

const addCate = (req, res) => {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)

  //定义async任务
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.body, ['name'], cb)
    },
    //查询方法
    add: [
      'checkParams',
      (results, cb) => {
        CateModel.create({
          name: req.body.name
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
 * 修改分类接口
 */
const updateCate = (req, res) => {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)

  //定义async任务
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.body, ['id', 'name'], cb)
    },
    //查询方法
    update: [
      'checkParams',
      (results, cb) => {
        CateModel.update(
          {
            name: req.body.name
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
              cb(Constant.CATE_NOT_EXIST)
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
 * 删除分类接口
 */

const deleteCate = (req, res) => {
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
        CateModel.destroy({
          where: {
            id: req.body.id
          }
        })
          .then(resData => {
            if (resData) {
              cb(null)
            } else {
              cb(Constant.CATE_NOT_EXIST)
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
  getCateList,
  getSingleInfo,
  addCate,
  updateCate,
  deleteCate
}

module.exports = exportObj
