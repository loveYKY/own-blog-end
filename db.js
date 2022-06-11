//数据库配置文件
const Sequelize = require('sequelize')

const CONFIG = require('./config.js')

const sequelize = new Sequelize(
  CONFIG.MYSQL.database,
  CONFIG.MYSQL.username,
  CONFIG.MYSQL.password,
  {
    host: CONFIG.MYSQL.host,
    dialect: 'mysql', //数据库类型
    logging: CONFIG.DEBUG ? console.log : false, //是否打印日志
    //配置数据库连接池
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    timezone: '+08:00' //时区设置
  }
)

module.exports = sequelize
