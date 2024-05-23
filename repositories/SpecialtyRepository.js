const { Specialty } = require('../models/Specialty');
const { CurriculumSpecialty } = require('../models/CurriculumSpecialty');
const { Curriculum } = require('../models/Curriculum');

const logger = require('../utils/logger');

async function getSpecialtiesByProgramId(programId) {
  try {
    const curriculumSpecialties = await CurriculumSpecialty.findAll({
      where: {
        curriculumId: programId,
      },
      include: Specialty,
    });

    const specialties = curriculumSpecialties.map((cs) => cs.specialty);
    return specialties;
  } catch (err) {
    throw err;
  }
}

async function getSpecialtyById(SpecialtyId) {
  try {
    const SpecialtyById = await Specialty.findOne({
      where: {
        id: SpecialtyId,
      },
    });

    return SpecialtyById;
  } catch (err) {
    throw err;
  }
}

async function getSpecialties() {
  try {
    const specialties = await Specialty.findAll();
    return specialties.map((row) => {
      return {
        id: row.id,
        name: row.name,
        programId: row.programId,
      };
    });
  } catch (err) {
    logger.error('Произошла ошибка при поиске специальностей', err);
    throw err;
  }
}

async function createSpecialty(newSpecialtyData) {
  try {
    const newSpecialty = await Specialty.create({ name: newSpecialtyData.title });

    if (!newSpecialty) {
      throw new Error('Не удалось создать специальность. Проверьте введенные данные');
    }

    return newSpecialty;
  } catch (err) {
    throw err;
  }
}

async function updateSpecialtyById(SpecialtyId, newSpecialtyData) {
  try {
    const updatedSpecialty = await Specialty.update(
      { name: newSpecialtyData.title },
      {
        where: {
          id: SpecialtyId,
        },
      },
    );

    if (updatedSpecialty[0] === 0) {
      throw new Error('Не удалось обновить специальность. Проверьте, существует ли специальность с данным ID');
    }

    return updatedSpecialty;
  } catch (err) {
    throw err;
  }
}

async function deleteSpecialtyById(SpecialtyId) {
  try {
    const curriculumSpecialties = await CurriculumSpecialty.findAll({
      where: {
        specialtyId: SpecialtyId,
      },
    });
    const curriculumIds = curriculumSpecialties.map((curriculumSpecialty) => curriculumSpecialty.curriculumId);

    const curriculums = await Curriculum.findAll({
      where: {
        id: curriculumIds,
      },
    });
    const curriculumNames = curriculums.map((curriculum) => curriculum.title).join(', ');

    if (curriculumNames.length > 0) {
      throw new Error(`Существуют программа(ы): (${curriculumNames}), которые связаны с этой специальностью. Удаление невозможно.`);
    }

    const deletedSpecialty = await Specialty.destroy({
      where: {
        id: SpecialtyId,
      },
    });

    if (!deletedSpecialty) {
      throw new Error('Не удалось удалить специальность. Проверьте, существует ли специальность с данным ID');
    }

    return deletedSpecialty;
  } catch (err) {
    throw err;
  }
}
module.exports = {
  getSpecialties,
  getSpecialtyById,
  getSpecialtiesByProgramId,
  createSpecialty,
  updateSpecialtyById,
  deleteSpecialtyById,
};
