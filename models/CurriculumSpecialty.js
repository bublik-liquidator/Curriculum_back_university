const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { Curriculum } = require('./Curriculum');
const { Specialty } = require('./Specialty');

const CurriculumSpecialty = sequelize.define(
  'curriculum_specialty',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    curriculumId: {
      type: DataTypes.INTEGER,
      references: {
        model: Curriculum,
        key: 'id',
      },
    },
    specialtyId: {
      type: DataTypes.INTEGER,
      references: {
        model: Specialty,
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
);
CurriculumSpecialty.belongsTo(Specialty, { foreignKey: 'specialtyId' });

module.exports = { CurriculumSpecialty };
