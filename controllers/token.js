const jwt = require('jsonwebtoken')
const tokenKey = 'UT9zo#W7!@50ETnk'

// 定义一个对象

const Token = {
  /**
   * Token 加密方法
   * @param data 需要加密在Token中的数据
   * @param time Token过期时间
   * @returns {*} 返回一个token
   */
  encrypt: (data, time) => {
    return jwt.sign(data, tokenKey, { expiresIn: time })
  },

  /**
   * Token解密方法
   * @param token 加密以后的token
   * @returns 返回对象
   */
  decrypt: token => {
    try {
      let data = jwt.verify(token, tokenKey)
      return {
        token: true,
        data: data
      }
    } catch (err) {
      return {
        token: false,
        data: err
      }
    }
  }
}

module.exports = Token
