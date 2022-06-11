const Common = require('./common.js')
const AdminModel = require('../models/admin.js')
const Constant = require('../constant/constant.js')
const moment = require('moment')
const Token = require('./token.js')
const TOKEN_EXPIRE_SENCOND = 3600 //设定默认Token的过期时间，单位s


//根据token获取用户信息
const getUserBytoken = (req, res) => {
  let resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  let token = req.headers.token
  let tokenVerifyObj = Token.decrypt(token)

  let tasks = {
    query: cb => {
      AdminModel.findOne({
        where: {
          id: tokenVerifyObj.data.id
        }
      })
        .then(resData => {
          if (resData) {
            resObj.data = {
              id: resData.id,
              username: resData.username,
              password: resData.password,
              name: resData.name,
              role: resData.role,
              content: resData.content,
              lastLoginAt: moment(resData.lastLoginAt)
                .utcOffset(8)
                .format('YYYY/MM/DD HH:mm:ss'),
              createdAt: moment(resData.createdAt)
                .utcOffset(8)
                .format('YYYY/MM/DD HH:mm:ss'),
              updateAt: moment(resData.updateAt)
                .utcOffset(8)
                .format('YYYY/MM/DD HH:mm:ss')
            }
            cb(null)
          } else {
            cb(Constant.ADMIN_NOT_EXIST)
          }
        })
        .catch(err => {
          console.log(err)
          cb(Constant.DEFAULT_ERROR)
        })
    }
  }
  Common.autoFn(tasks, res, resObj)
}

const getAdminList = (req, res) => {
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
        if (req.query.username) {
          whereCondition.username = req.query.username
        }
        searchOption = {
          where: whereCondition,
          offset: offset,
          limit: limit,
          order: [['created_at', 'ASC']]
        }
        AdminModel.findAndCountAll(searchOption)
          .then(resData => {
            if (resData) {
              let list = []
              list = resData.rows.map(item => {
                return {
                  id: item.id,
                  username: item.username,
                  password: item.password,
                  name: item.name,
                  role: item.role,
                  content: item.content,
                  lastLoginAt: moment(item.lastLoginAt)
                    .utcOffset(8)
                    .format('YYYY/MM/DD HH:mm:ss'),
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
 * 单条管理员信息接口
 */

const getSingleAdmin = (req, res) => {
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
        AdminModel.findOne({
          where: {
            id: req.params.id
          }
        })
          .then(resData => {
            if (resData) {
              resObj.data = {
                id: resData.id,
                username: resData.username,
                password: resData.password,
                name: resData.name,
                role: resData.role,
                content: resData.content,
                lastLoginAt: moment(resData.lastLoginAt)
                  .utcOffset(8)
                  .format('YYYY/MM/DD HH:mm:ss'),
                createdAt: moment(resData.createdAt)
                  .utcOffset(8)
                  .format('YYYY/MM/DD HH:mm:ss'),
                updateAt: moment(resData.updateAt)
                  .utcOffset(8)
                  .format('YYYY/MM/DD HH:mm:ss')
              }
              cb(null)
            } else {
              cb(Constant.ADMIN_NOT_EXIST)
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
 * 添加管理员接口
 */
const addAdmin = (req, res) => {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)

  //定义async任务
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.body, ['username', 'password', 'name', 'role'], cb)
    },
    //查询方法
    add: [
      'checkParams',
      (results, cb) => {
        AdminModel.create({
          username: req.body.username,
          password: req.body.password,
          name: req.body.name,
          role: req.body.role
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
 * 修改管理员接口
 */

const updateAdmin = (req, res) => {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)

  //定义async任务
  let tasks = {
    checkParams: cb => {
      Common.checkParams(
        req.body,
        ['id', 'username', 'password', 'name', 'role'],
        cb
      )
    },
    //查询方法
    update: [
      'checkParams',
      (results, cb) => {
        AdminModel.update(
          {
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            role: req.body.role
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
              cb(Constant.ADMIN_NOT_EXIST)
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
 * 删除管理员接口
 */

const deleteAdmin = (req, res) => {
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
        AdminModel.destroy({
          where: {
            id: req.body.id
          }
        })
          .then(resData => {
            if (resData) {
              cb(null)
            } else {
              cb(Constant.ADMIN_NOT_EXIST)
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
  getUserBytoken,
  getAdminList,
  getSingleAdmin,
  addAdmin,
  updateAdmin,
  deleteAdmin
}

module.exports = exportObj
