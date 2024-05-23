const userService = require('../services/userService');

async function login(req, res) {
  try {
    const token = await userService.login(req.body);
    return res.json({ token });
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).send(err.message);
  }
}

async function changePassword(req, res) {
  try {
    const message = await userService.changePassword(req.body);
    return res.send(message);
  } catch (err) {
    return res.status(err.status || 500).send(err.message);
  }
}

async function getUserById(req, res) {
  try {
    const user = await userService.getUserById(req.params.id);
    return res.json(user);
  } catch (err) {
    return res.status(err.status || 500).send(err.message);
  }
}
async function createUser(req, res) {
  try {
    const { name, contact, role, password } = req.body;
    const user = await userService.createUser(name, contact, role, password);
    return res.json(user);
  } catch (err) {
    return res.status(err.status || 500).send(err.message);
  }
}

async function updateUser(req, res) {
  try {
    const message = await userService.updateUser(req.params.id, req.body);
    return res.status(200).json({ message });
  } catch (err) {
    return res.status(err.status || 500).send(err.message);
  }
}

async function getUsers(req, res) {
  try {
    const page = req.body.page || 1;
    const limit = req.body.limit || 10;
    const users = await userService.getUsers(page, limit);
    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).send(err.message);
  }
}

async function searchUsers(req, res) {
  try {
    const searchQuery = req.body.search || '';
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 0;
    const users = await userService.searchUsers(searchQuery, limit, page);
    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).send(err.message);
  }
}

async function removeUser(req, res) {
  try {
    const users = await userService.removeUser(req.params.id);
    return res.status(200).json(users);
  } catch (err) {
    return res.status(err.status || 500).send(err.message);
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
