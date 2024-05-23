const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define(
  'user_data',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    contact: DataTypes.STRING,
    role: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
);

module.exports = { User };
