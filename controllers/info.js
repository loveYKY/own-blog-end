const Common = require('./common.js')
const InfoModel = require('../models/info.js')
const Constant = require('../constant/constant.js')
const moment = require('moment')

const getInfo = (req, res) => {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)

  let tasks = {
    query: cb => {
      InfoModel.findByPk(1)
        .then(resData => {
          if (resData) {
            resObj.data = {
              id: resData.id,
              title: resData.title,
              subtitle: resData.subtitle,
              about: resData.about,
              createdAt: moment(resData.createdAt)
                .utcOffset(8)
                .format('YYYY/MM/DD HH:mm:ss')
            }
            cb(null)
          } else {
            cb(Constant.BLOG_INFO_NOT_EXIST)
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

/**
 * 修改博客信息接口
 */
const updateInfo = (req, res) => {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)

  let tasks = {
    query: cb => {
      InfoModel.update(
        {
          title: req.body.title,
          subtitle: req.body.subtitle,
          about: req.body.about
        },
        {
          where: {
            id: 1
          }
        }
      )
        .then(resData => {
          if (resData[0]) {
            cb(null)
          } else {
            cb(Constant.BLOG_INFO_NOT_EXIST)
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

const exportObj = {
  getInfo,
  updateInfo
}

module.exports = exportObj
