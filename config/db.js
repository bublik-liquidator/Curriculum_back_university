require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.PG_DB,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    dialect: 'postgres',
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => console.log('Подключение к базе данных установлено успешно.'))
  .catch((err) => console.error('Не удалось подключиться к базе данных:', err));

module.exports = sequelize;
