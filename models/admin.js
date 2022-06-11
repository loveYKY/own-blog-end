const {Sequelize, DataTypes} = require('sequelize')
const db = require('../db.js')

const Admin = db.define(
  'Admin',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(36),
      allowNull: false
    },
    name: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    lastLoginAt: {
      type: DataTypes.DATE
    }
  },
  {
    underscored: true,
    tableName: 'admin'
  }
)

module.exports = Admin
