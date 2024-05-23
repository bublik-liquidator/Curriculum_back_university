const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const { Curriculum } = require('../models/Curriculum');
const { Op } = require('sequelize');

const logger = require('../utils/logger');

const saltRounds = 10;

async function login(name, password) {
  try {
    const user = await User.findOne({ where: { name: name } });
    if (!user) {
      throw new Error('Неверные учетные данные. Пожалуйста, попробуйте еще раз.');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Неверные учетные данные. Пожалуйста, попробуйте еще раз.');
    }
    const isAdmin = user.role === 'admin';
    const token = jwt.sign({ id: user.id, isAdmin, name: user.name }, process.env.SECRET);
    return token;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function changePassword(name, oldPassword, newPassword) {
  try {
    const user = await User.findOne({ where: { name: name } });
    if (!user) {
      throw new Error('Пользователь не найден');
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new Error('Некорректный старый пароль');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return 'Пароль успешно обновлен';
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getUserById(id) {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('Пользователь не найден');
    }
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
async function getUsers(page, limit) {
  try {
    const offset = (page - 1) * limit;
    const users = await User.findAll({
      offset: offset,
      limit: limit,
      order: [['id', 'ASC']],
    });

    const totalUsers = await User.count();

    const transformedUsers = users.map((user) => {
      const data = user.get({ plain: true });
      return data;
    });

    return {
      users: transformedUsers,
      total: totalUsers,
    };
  } catch (err) {
    logger.error('Произошла ошибка при поиске пользователей', err);
    throw err;
  }
}

async function searchUsers(searchQuery, limit, page) {
  try {
    const users = await User.findAll({
      where: {
        name: {
          [Op.like]: searchQuery + '%',
        },
      },
      limit: limit,
      offset: (page - 1) * limit,
      order: [['id', 'ASC']],
    });

    const totalUsers = await User.count({
      where: {
        name: {
          [Op.like]: searchQuery + '%',
        },
      },
    });

    return {
      users: users,
      total: totalUsers,
    };
  } catch (err) {
    logger.error('Произошла ошибка при поиске пользователей', err);
    throw err;
  }
}

async function createUser(name, contact, role, password) {
  try {
    if (!password) {
      throw new Error('Пароль не определён' + password);
    }
    const existingUser = await User.findOne({ where: { name: name } });
    if (existingUser) {
      throw new Error('Пользователь с таким именем уже существует');
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
      name: name,
      password: hashedPassword,
      contact: contact,
      role: role,
    });
    return { message: 'Пользователь успешно создан!' };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function updateUser(userId, userData) {
  try {
    const userToUpdate = await User.findByPk(userId);
    if (!userToUpdate) {
      throw new Error('Пользователь не найден');
    }
    const updates = await Promise.all(
      Object.entries(userData).map(async ([key, value]) => {
        if (key === 'password' && value) {
          const hashedPassword = await bcrypt.hash(value, saltRounds);
          return [key, hashedPassword];
        } else if (value) {
          return [key, value];
        }
      }),
    );
    const updatedFields = Object.fromEntries(updates);
    Object.assign(userToUpdate, updatedFields);
    await userToUpdate.save();
    return 'Данные пользователя успешно обновлены';
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function removeUser(userId) {
  try {
    const userToRemove = await User.findByPk(userId);
    if (!userToRemove) {
      throw new Error('Пользователь не найден');
    }
    const curriculums = await Curriculum.findAll({
      where: {
        developerId: userId,
      },
    });
    if (curriculums.length > 0) {
      const curriculumNames = curriculums.map((curriculum) => curriculum.title).join(', ');
      throw new Error(`Существуют программа(ы): (${curriculumNames}), которые связаны с этим пользователем. Удаление невозможно.`);
    }
    await userToRemove.destroy();
    return 'Пользователь успешно удален';
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
  login,
  changePassword,
  getUserById,
  createUser,
  updateUser,
  getUsers,
  searchUsers,
  removeUser,
};
