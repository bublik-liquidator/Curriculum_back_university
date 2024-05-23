const specialtyService = require('../services/specialtyService');

async function getSpecialties(req, res) {
  try {
    const specialties = await specialtyService.getSpecialties(req.body);
    return res.json(specialties);
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).send(err.message);
  }
}

async function getSpecialtyById(req, res) {
  try {
    const specialties = await specialtyService.getSpecialtyById(req.params.id);
    return res.json(specialties);
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).send(err.message);
  }
}

async function getSpecialtiesById(req, res) {
  try {
    const specialties = await specialtyService.getSpecialtiesById(req.params.id);
    return res.json(specialties);
  } catch (err) {
    return res.status(err.status || 500).send(err.message);
  }
}

async function createSpecialty(req, res) {
  try {
    const newSpecialty = await specialtyService.createSpecialty(req.body);
    return res.json(newSpecialty);
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).send(err.message);
  }
}

async function updateSpecialtyById(req, res) {
  try {
    const updatedSpecialty = await specialtyService.updateSpecialtyById(req.params.id, req.body);
    return res.json(updatedSpecialty);
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).send(err.message);
  }
}

async function deleteSpecialtyById(req, res) {
  try {
    const deletedSpecialty = await specialtyService.deleteSpecialtyById(req.params.id);
    return res.json(deletedSpecialty);
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).send(err.message);
  }
}

module.exports = {
  getSpecialties,
  getSpecialtiesById,
  getSpecialtyById,
  createSpecialty,
  updateSpecialtyById,
  deleteSpecialtyById,
};
