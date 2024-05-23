const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const curriculumController = require('../controllers/curriculumController');
const { authenticateToken, authenticateAdmin } = require('../middleware/auth');

router.post('/get-curriculums', authenticateToken, curriculumController.getCurriculums);
router.get('/get-curriculum/:id', authenticateToken, curriculumController.getCurriculumById);
router.get('/get-curriculums-status/:id', authenticateToken, curriculumController.getCurriculumStatusById);

router.get('/get-expiring-curriculums', authenticateToken, curriculumController.getExpiringCurriculums);

router.put('/update-curriculum/:id', authenticateToken, upload.single('file'), curriculumController.updateCurriculum);
router.put('/update-curriculum-info/:id', authenticateToken, curriculumController.updateCurriculumInfo);

router.post('/create-curriculum', authenticateToken, upload.single('file'), curriculumController.createCurriculum);
router.post('/save-curriculum-asWord-to-client/:id', authenticateToken, curriculumController.saveCurriculum);

router.get('/sort-curriculums', authenticateToken, curriculumController.sortCurriculums);

router.post('/search-curriculums', authenticateToken, curriculumController.searchCurriculums);

router.delete('/delete-curriculum/:id', authenticateToken, curriculumController.deleteCurriculum);

module.exports = router;
