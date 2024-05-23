const statusService = require('../services/statusService');

async function getStatusById(req, res) {
  try {
    const status = await statusService.getStatusById(req.params.id);
    return res.json(status);
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).send(err.message);
  }
}

async function updateStatusById(req, res) {
  try {
    const updatedStatuses = await statusService.updateStatusById(req.params.id, req.body);
    return res.json(updatedStatuses);
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).send(err.message);
  }
}

async function createStatus(req, res) {
  try {
    const createdStatuses = await statusService.createStatus(req.body);
    return res.json(createdStatuses);
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).send(err.message);
  }
}

async function getStatuses(req, res) {
  try {
    const statuses = await statusService.getStatuses();
    return res.json(statuses);
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).send(err.message);
  }
}

async function deleteStatusById(req, res) {
  try {
    const deletedStatus = await statusService.deleteStatusById(req.params.id);
    return res.json(deletedStatus);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
}

module.exports = {
  getStatusById,
  updateStatusById,
  deleteStatusById,
  createStatus,
  getStatuses,
};
