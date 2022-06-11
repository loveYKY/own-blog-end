const {Sequelize, DataTypes} = require('sequelize')
const db = require('../db.js')

const Info = db.define(
  'Info',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    subtitle: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    about: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  },
  {
    underscored: true,
    tableName: 'info'
  }
)

module.exports = Info
