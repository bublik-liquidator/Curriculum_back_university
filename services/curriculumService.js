const curriculumRepository = require('../repositories/CurriculumRepository');

async function getCurriculums(user, page, limit) {
  return await curriculumRepository.getCurriculums(user, page, limit);
}

async function searchCurriculums(user, searchQuery, limit, page) {
  return await curriculumRepository.searchCurriculums(user, searchQuery, limit, page);
}

async function getCurriculumById(id) {
  return await curriculumRepository.getCurriculumById(id);
}

async function getExpiringCurriculums(user, page, limit) {
  return await curriculumRepository.getExpiringCurriculums(user, page, limit);
}

async function updateCurriculum(id, file) {
  return await curriculumRepository.updateCurriculum(id, file);
}

async function updateCurriculumInfo(id, curriculumData) {
  return await curriculumRepository.updateCurriculumInfo(id, curriculumData);
}

async function saveCurriculum(id) {
  return await curriculumRepository.saveCurriculum(id);
}

async function deleteCurriculum(id) {
  return await curriculumRepository.deleteCurriculum(id);
}

async function sortCurriculums(sortBy) {
  return await curriculumRepository.sortCurriculums(sortBy);
}

async function getCurriculumStatusById(id) {
  return await curriculumRepository.getCurriculumStatusById(id);
}

async function createCurriculum(curriculumData, file) {
  return await curriculumRepository.createCurriculum(curriculumData, file);
}

module.exports = {
  getCurriculums,
  getCurriculumById,
  updateCurriculum,
  getExpiringCurriculums,
  saveCurriculum,
  deleteCurriculum,
  sortCurriculums,
  getCurriculumStatusById,
  searchCurriculums,
  updateCurriculumInfo,
  createCurriculum,
};
