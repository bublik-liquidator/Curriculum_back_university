const educationFormService = require('../services/educationFormService');

async function getEducationFormById(req, res) {
  try {
    const educationForm = await educationFormService.getEducationFormById(req.params.id);
    return res.json(educationForm);
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).send(err.message);
  }
}

async function updateEducationFormById(req, res) {
  try {
    const updatedEducationForms = await educationFormService.updateEducationFormById(req.params.id, req.body);
    return res.json(updatedEducationForms);
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).send(err.message);
  }
}

async function createEducationForm(req, res) {
  try {
    const createdEducationForms = await educationFormService.createEducationForm(req.body);
    return res.json(createdEducationForms);
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).send(err.message);
  }
}

async function getEducationForms(req, res) {
  try {
    const educationForms = await educationFormService.getEducationForms();
    return res.json(educationForms);
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).send(err.message);
  }
}

async function deleteEducationFormById(req, res) {
  try {
    const deletedEducationForm = await educationFormService.deleteEducationFormById(req.params.id);
    return res.json(deletedEducationForm);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
}

module.exports = {
  getEducationFormById,
  updateEducationFormById,
  deleteEducationFormById,
  createEducationForm,
  getEducationForms,
};
