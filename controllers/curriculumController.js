const curriculumService = require('../services/curriculumService');

async function getCurriculums(req, res) {
  try {
    const page = req.body.page;
    const limit = req.body.limit;
    const curriculums = await curriculumService.getCurriculums(req.user, page, limit);
    return res.json(curriculums);
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).send(err.message);
  }
}

async function searchCurriculums(req, res) {
  try {
    const searchQuery = req.body.search;
    const limit = parseInt(req.body.limit);
    const page = parseInt(req.body.page);
    if (isNaN(page)) {
      throw new Error('Page is not a number');
    }
    const curriculums = await curriculumService.searchCurriculums(req.user, searchQuery, limit, page);
    return res.json(curriculums);
  } catch (err) {
    console.log(err.message);
    return res.status(err.status || 500).json({ message: err.message });
  }
}

async function getCurriculumById(req, res) {
  try {
    const curriculum = await curriculumService.getCurriculumById(req.params.id);
    return res.json(curriculum);
  } catch (err) {
    return res.status(err.status || 500).send(err.message);
  }
}

async function getExpiringCurriculums(req, res) {
  try {
    const page = req.body.page || 1;
    const limit = req.body.limit || 10;
    const curriculums = await curriculumService.getExpiringCurriculums(req.user, page, limit);
    return res.json(curriculums);
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).send(err.message);
  }
}

async function saveCurriculum(req, res) {
  try {
    const curriculum = await curriculumService.saveCurriculum(req.params.id);
    res.setHeader('Content-Disposition', 'attachment; filename=' + curriculum.fileName);
    res.setHeader('Content-Type', curriculum.contentType);
    return res.send(curriculum.file);
  } catch (err) {
    return res.status(err.status || 500).send(err.message);
  }
}

async function updateCurriculum(req, res) {
  try {
    const curriculum = await curriculumService.updateCurriculum(req.params.id, req.file);
    return res.json(curriculum);
  } catch (err) {
    return res.status(err.status || 500).send(err.message);
  }
}

async function updateCurriculumInfo(req, res) {
  try {
    const curriculum = await curriculumService.updateCurriculumInfo(req.params.id, req.body);
    return res.json(curriculum);
  } catch (err) {
    console.error('Произошла ошибка:', err);
    return res.status(err.status || 400).send(err.message);
  }
}

async function deleteCurriculum(req, res) {
  try {
    const message = await curriculumService.deleteCurriculum(req.params.id);
    return res.json({ message });
  } catch (err) {
    return res.status(err.status || 500).send(err.message);
  }
}

async function sortCurriculums(req, res) {
  try {
    const curriculums = await curriculumService.sortCurriculums();
    return res.json(curriculums);
  } catch (err) {
    return res.status(err.status || 500).send(err.message);
  }
}

async function getCurriculumStatusById(req, res) {
  try {
    const status = await curriculumService.getCurriculumStatusById(req.params.id);
    return res.json(status);
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).send(err.message);
  }
}

async function createCurriculum(req, res) {
  try {
    const curriculumData = JSON.parse(req.body.curriculum);
    const curriculum = await curriculumService.createCurriculum(curriculumData, req.file);
    return res.json(curriculum);
  } catch (err) {
    console.error('Произошла ошибка:', err);
    return res.status(err.status || 400).send(err.message);
  }
}

module.exports = {
  getCurriculums,
  getCurriculumById,
  getCurriculumStatusById,
  getExpiringCurriculums,
  saveCurriculum,
  updateCurriculum,
  updateCurriculumInfo,
  sortCurriculums,
  searchCurriculums,
  createCurriculum,
  deleteCurriculum,
};
