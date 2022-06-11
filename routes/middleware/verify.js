const Token = require('../../controllers/token.js')
const Constant = require('../../constant/constant.js')


//验证token中间件

const verifyToken = (req, res, next) => {
  //如果请求路径是login则跳过
  if (req.path == '/login') {
    next()
  }
  let token = req.headers.token

  let tokenVerifyObj = Token.decrypt(token)
  if (tokenVerifyObj.token) {
    next()
  } else {
    res.json(Constant.TOKEN_ERROR)
  }
}


const exportObj = {
    verifyToken
}

module.exports = exportObj