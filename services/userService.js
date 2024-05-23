const userRepository = require('../repositories/UserRepository');

async function login({ name, password }) {
  if (!name || !password) {
    throw { status: 400, message: 'Требуются имя пользователя и пароль' };
  }
  const token = await userRepository.login(name, password);
  return token;
}

async function changePassword({ name, oldPassword, newPassword }) {
  if (!name || !oldPassword || !newPassword) {
    throw { status: 400, message: 'Требуются имя пользователя и старый и новый пароли' };
  }
  const message = await userRepository.changePassword(name, oldPassword, newPassword);
  return message;
}

async function getUserById(id) {
  const user = await userRepository.getUserById(id);
  return user;
}

async function createUser(name, contact, role, password) {
  const user = await userRepository.createUser(name, contact, role, password);
  return user;
}

async function updateUser(userId, body) {
  const message = await userRepository.updateUser(userId, body);
  return message;
}

async function getUsers(page, limit) {
  return await userRepository.getUsers(page, limit);
}

async function searchUsers(searchQuery, limit, page) {
  return await userRepository.searchUsers(searchQuery, limit, page);
}

async function removeUser(id) {
  const user = await userRepository.removeUser(id);
  return user;
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
