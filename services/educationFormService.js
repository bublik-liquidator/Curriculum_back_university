const educationFormRepository = require('../repositories/EducationFormRepository');

async function getEducationFormById(educationFormId) {
  return await educationFormRepository.getEducationFormById(educationFormId);
}

async function updateEducationFormById(educationFormId, updateEducationForm) {
  return await educationFormRepository.updateEducationFormById(educationFormId, updateEducationForm);
}

async function deleteEducationFormById(educationFormId) {
  return await educationFormRepository.deleteEducationFormById(educationFormId);
}

async function createEducationForm(educationForm) {
  return await educationFormRepository.createEducationForm(educationForm);
}

async function getEducationForms() {
  return await educationFormRepository.getEducationForms();
}

module.exports = {
  getEducationFormById,
  updateEducationFormById,
  deleteEducationFormById,
  createEducationForm,
  getEducationForms,
};
