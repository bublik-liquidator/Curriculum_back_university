const curriculumRepository = require('../repositories/ArchiveRepository');

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

async function getCurriculumStatusById(id) {
  return await curriculumRepository.getCurriculumStatusById(id);
}

module.exports = {
  getCurriculums,
  getCurriculumById,
  getExpiringCurriculums,
  getCurriculumStatusById,
  searchCurriculums,
};
