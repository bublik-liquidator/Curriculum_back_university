const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const EducationForm = sequelize.define(
  'education_form',
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

module.exports = { EducationForm };
