const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const curriculumController = require('../controllers/archiveController');
const { authenticateToken, authenticateAdmin } = require('../middleware/auth');

router.post('/get-curriculums', authenticateToken, curriculumController.getCurriculums);
router.get('/get-curriculum/:id', authenticateToken, curriculumController.getCurriculumById);
router.get('/get-curriculums-status/:id', authenticateToken, curriculumController.getCurriculumStatusById);

router.get('/get-expiring-curriculums', authenticateToken, curriculumController.getExpiringCurriculums);

router.post('/search-curriculums', authenticateToken, curriculumController.searchCurriculums);

module.exports = router;
