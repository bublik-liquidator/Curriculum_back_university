const statusRepository = require('../repositories/StatusRepository');

async function getStatusById(statusId) {
  return await statusRepository.getStatusById(statusId);
}

async function updateStatusById(statusId, updateStatus) {
  return await statusRepository.updateStatusById(statusId, updateStatus);
}

async function deleteStatusById(statusId) {
  return await statusRepository.deleteStatusById(statusId);
}

async function createStatus(status) {
  return await statusRepository.createStatus(status);
}

async function getStatuses() {
  return await statusRepository.getStatuses();
}

module.exports = {
  getStatusById,
  updateStatusById,
  deleteStatusById,
  createStatus,
  getStatuses,
};
