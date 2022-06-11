const obj = {
  DEFAULT_SUCCESS: {
    code: 200,
    msg: 'success'
  },
  DEFAULT_ERROR: {
    code: 0,
    msg: '系统错误'
  },
  LACK: {
    code: 199,
    msg: '缺少必要的参数'
  },
  TOKEN_ERROR: {
    code: 401,
    msg: 'token验证不通过'
  },
  LOGIN_ERROR: {
    code: 101,
    msg: '用户名或密码错误'
  },
  ARTICLE_NOT_EXIST: {
    code: 102,
    msg: '文章不存在'
  },
  ADMIN_NOT_EXIST: {
    code: 103,
    msg: '管理员不存在'
  },
  CATE_NOT_EXIST: {
    code: 104,
    msg: '分类信息不存在'
  },
  BLOG_INFO_NOT_EXIST: {
    code: 105,
    msg: '博客信息不存在'
  }
}

module.exports = obj
