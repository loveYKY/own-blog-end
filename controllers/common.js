const Constant = require('../constant/constant.js')
const async = require('async')
const _ = require('lodash')

//克隆方法
const clone = obj => {
  return _.clone(obj)
}

/**
 *
 * @param params //请求参数集
 * @param checkArr //需要验证的参数
 * @param cb // 回调
 */
const checkParams = (params, checkArr, cb) => {
  let flag = true
  checkArr.forEach(val => {
    if (!params[val]) {
      flag = false
    }
  })
  if (flag) {
    cb(null)
  } else {
    cb(Constant.LACK)
  }
}

// 统一返回方法(返回JSON格式数据)
const autoFn = (tasks, res, resObj) => {
  async.auto(tasks, (err, results) => {
    if (!!err) {
      console.log(JSON.stringify(err))
      res.json({
        code: err.code || Constant.DEFAULT_ERROR.code,
        msg: err.msg || JSON.stringify(err)
      })
    } else {
      res.json(resObj)
    }
  })
}

const exportObj = {
  clone,
  checkParams,
  autoFn
}

module.exports = exportObj
