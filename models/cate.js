const {Sequelize, DataTypes} = require('sequelize')
const db = require('../db.js')

const Cate = db.define(
  'Cate',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  },
  {
    underscored: true,
    tableName: 'cate'
  }
)

module.exports = Cate
