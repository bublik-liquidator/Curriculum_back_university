const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');
const { authenticateToken, authenticateAdmin } = require('../middleware/auth');

router.get('/get-status/:id', authenticateToken, statusController.getStatusById);
router.get('/get-statuses', authenticateToken, statusController.getStatuses);
router.post('/create-statuses', authenticateToken, authenticateAdmin, statusController.createStatus);
router.put('/update-statuses/:id', authenticateToken, authenticateAdmin, statusController.updateStatusById);
router.delete('/delete-statuses/:id', authenticateToken, authenticateAdmin, statusController.deleteStatusById);

module.exports = router;
