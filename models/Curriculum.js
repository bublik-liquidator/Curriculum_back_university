const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { User } = require('./User');
const { Statuses } = require('./Status');
const { EducationForm } = require('./EducationForm');

const Curriculum = sequelize.define(
  'curriculum',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    year: DataTypes.INTEGER,
    statusId: {
      type: DataTypes.INTEGER,
      references: {
        model: Statuses,
        key: 'id',
      },
    },
    educationFormId: {
      type: DataTypes.INTEGER,
      references: {
        model: EducationForm,
        key: 'id',
      },
    },
    filePath: DataTypes.BLOB,
    lastModified: DataTypes.DATE,
    developerId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    expiryDate: DataTypes.DATE,
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
);
Curriculum.belongsTo(User, { foreignKey: 'developerId', as: 'developer' });
Curriculum.belongsTo(Statuses, { foreignKey: 'statusId', as: 'status' });
Curriculum.belongsTo(EducationForm, { foreignKey: 'educationFormId', as: 'educationForm' });
module.exports = { Curriculum };
