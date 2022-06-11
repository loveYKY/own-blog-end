const {Sequelize, DataTypes} = require('sequelize')
const db = require('../db.js')
const CateModel = require('./cate.js')

const Article = db.define(
  'Article',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cate: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    underscored: true,
    tableName: 'article'
  }
)

module.exports = Article

Article.belongsTo(CateModel, { foreignKey: 'cate', constraints: false })
