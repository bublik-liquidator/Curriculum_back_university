const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Statuses = sequelize.define(
  'status',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
);

module.exports = { Statuses };
