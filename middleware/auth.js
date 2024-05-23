const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    logger.error('Токен не предоставлен');
    return res.status(401).json({ error: 'Токен не предоставлен' });
  }

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      logger.error('Ошибка при проверке токена: ', err);
      return res.status(403).json({ error: 'Ошибка при проверке токена' });
    }
    req.user = user;
    next();
  });
}

function authenticateAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json({ error: 'Доступ запрещен. Вы должны быть администратором, чтобы выполнить это действие' });
  }
}

module.exports = { authenticateToken, authenticateAdmin };
