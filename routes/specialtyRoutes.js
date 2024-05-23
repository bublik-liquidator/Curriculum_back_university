const express = require('express');
const router = express.Router();
const specialtyController = require('../controllers/specialtyController');
const { authenticateToken, authenticateAdmin } = require('../middleware/auth');

router.get('/get-specialties', authenticateToken, specialtyController.getSpecialties);
router.get('/get-specialties/:id', authenticateToken, specialtyController.getSpecialtiesById);
router.get('/get-specialty/:id', authenticateToken, specialtyController.getSpecialtyById);
router.post('/create-specialties', authenticateToken, authenticateAdmin, specialtyController.createSpecialty);
router.put('/update-specialties/:id', authenticateToken, authenticateAdmin, specialtyController.updateSpecialtyById);
router.delete('/delete-specialties/:id', authenticateToken, authenticateAdmin, specialtyController.deleteSpecialtyById);

module.exports = router;
