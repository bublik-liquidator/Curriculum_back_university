const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, authenticateAdmin } = require('../middleware/auth');

router.post('/login', userController.login);
router.get('/get-user/:id', authenticateToken, userController.getUserById);
router.post('/get-users', authenticateToken, userController.getUsers);
router.post('/change-password', authenticateToken, authenticateAdmin, userController.changePassword);
router.post('/create-user', authenticateToken, authenticateAdmin, userController.createUser);
router.put('/update-user/:id', authenticateToken, authenticateAdmin, userController.updateUser);
router.delete('/delete-user/:id', authenticateToken, authenticateAdmin, userController.removeUser);
router.post('/search-users', authenticateToken, authenticateAdmin, userController.searchUsers);

module.exports = router;
