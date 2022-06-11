const Common = require('./common.js')
const AdminModel = require('../models/admin.js')
const Constant = require('../constant/constant.js')
const Token = require('./token.js')
const moment = require('moment')
const TOKEN_EXPIRE_SENCOND = 7200 //设定默认Token的过期时间，单位s

const login = (req, res) => {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)

  let tasks = {
    //校验参数方法
    checkParams: cb => {
      Common.checkParams(req.body, ['username', 'password'], cb)
    },
    //查询方法
    query: [
      'checkParams',
      (results, cb) => {
        //通过用户名和密码到数据库查询
        AdminModel.findOne({
          where: {
            username: req.body.username,
            password: req.body.password
          }
        })
          .then(res => {
            if (res) {
              //组装数据
              resObj.data = {
                id: res.id,
                username: res.username,
                name: res.name,
                role: res.role,
                lastLoginAt: moment(res.lastLoginAt)
                  .utcOffset(8)
                  .format('YYYY/MM/DD HH:mm:ss'),
                createdAt: moment(res.createdAt)
                  .utcOffset(8)
                  .format('YYYY/MM/DD HH:mm:ss')
              }
              //将admin保存到token中
              const adminInfo = {
                id: res.id
              }
              //生成token
              let token = Token.encrypt(adminInfo, TOKEN_EXPIRE_SENCOND)
              resObj.data.token = token
              //将找到的id传给下一个async函数(writeLastLoginAt)
              cb(null, res.id)
            } else {
              cb(Constant.LOGIN_ERROR)
            }
          })
          .catch(err => {
            console.log(err)
            cb(Constant.DEFAULT_ERROR)
          })
      }
    ],
    //写入上次登陆信息
    writeLastLoginAt: [
      'query',
      (results, cb) => {
        let adminId = results['query']
        AdminModel.update(
          {
            lastLoginAt: new Date()
          },
          {
            where: {
              id: adminId
            }
          }
        )
          .then(res => {
            if (res) {
              cb(null)
            } else {
              cb(Constant.DEFAULT_ERROR)
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


let exportObj = { login }
module.exports = exportObj
