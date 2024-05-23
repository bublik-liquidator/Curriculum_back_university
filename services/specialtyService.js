const specialtyRepository = require('../repositories/SpecialtyRepository');

async function getSpecialties() {
  return await specialtyRepository.getSpecialties();
}

async function getSpecialtyById(specialiatyId) {
  return await specialtyRepository.getSpecialtyById(specialiatyId);
}

async function createSpecialty(newSpecialtyData) {
  return await specialtyRepository.createSpecialty(newSpecialtyData);
}

async function updateSpecialtyById(specialiatyId, newSpecialtyData) {
  return await specialtyRepository.updateSpecialtyById(specialiatyId, newSpecialtyData);
}

async function getSpecialtiesById(programId) {
  return await specialtyRepository.getSpecialtiesByProgramId(programId);
}

async function deleteSpecialtyById(specialiatyId) {
  return await specialtyRepository.deleteSpecialtyById(specialiatyId);
}

module.exports = {
  getSpecialties,
  getSpecialtiesById,
  getSpecialtyById,
  createSpecialty,
  updateSpecialtyById,
  deleteSpecialtyById,
};
