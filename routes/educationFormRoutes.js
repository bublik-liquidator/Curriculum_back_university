const express = require('express');
const router = express.Router();
const educationFormController = require('../controllers/educationFormController');
const { authenticateToken, authenticateAdmin } = require('../middleware/auth');

router.get('/get-education-form/:id', authenticateToken, educationFormController.getEducationFormById);
router.get('/get-education-forms', authenticateToken, educationFormController.getEducationForms);
router.post('/create-education-forms', authenticateToken, authenticateAdmin, educationFormController.createEducationForm);
router.put('/update-education-forms/:id', authenticateToken, authenticateAdmin, educationFormController.updateEducationFormById);
router.delete('/delete-education-forms/:id', authenticateToken, authenticateAdmin, educationFormController.deleteEducationFormById);

module.exports = router;
