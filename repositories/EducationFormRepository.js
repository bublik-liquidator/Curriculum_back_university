const { EducationForm } = require('../models/EducationForm');
const { Curriculum } = require('../models/Curriculum');

async function getEducationForms() {
  try {
    const educationForms = await EducationForm.findAll();

    if (!educationForms) {
      throw new Error('Не удалось получить формы образования');
    }

    return educationForms;
  } catch (err) {
    throw err;
  }
}

async function getEducationFormById(educationFormId) {
  try {
    const educationForm = await EducationForm.findOne({
      where: {
        id: educationFormId,
      },
    });

    if (!educationForm) {
      throw new Error('Форма образования с данным ID не найдена');
    }

    return educationForm;
  } catch (err) {
    throw err;
  }
}

async function updateEducationFormById(educationFormId, updateEducationForm) {
  try {
    const { title: name } = updateEducationForm;
    const updatedEducationForm = await EducationForm.update(
      { name },
      {
        where: {
          id: educationFormId,
        },
      },
    );

    if (!updatedEducationForm) {
      throw new Error('Не удалось обновить форму образования. Проверьте, существует ли форма образования с данным ID');
    }

    return updatedEducationForm;
  } catch (err) {
    throw err;
  }
}

async function createEducationForm(educationForm) {
  try {
    const { title: name } = educationForm;
    const createdEducationForm = await EducationForm.create({ name });

    if (!createdEducationForm) {
      throw new Error('Не удалось создать форму образования');
    }

    return createdEducationForm;
  } catch (err) {
    throw err;
  }
}

async function deleteEducationFormById(educationFormId) {
  try {
    const curriculums = await Curriculum.findAll({
      where: {
        educationFormId: educationFormId,
      },
    });

    if (curriculums.length > 0) {
      const curriculumNames = curriculums.map((curriculum) => curriculum.title).join(', ');
      throw new Error(`Существуют программа(ы): (${curriculumNames}), которые используют эту форму образования. Удаление невозможно.`);
    }

    const deletedEducationForm = await EducationForm.destroy({
      where: {
        id: educationFormId,
      },
    });

    if (!deletedEducationForm) {
      throw new Error('Не удалось удалить форму образования. Проверьте, существует ли форма образования с данным ID');
    }
    return deletedEducationForm;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getEducationFormById,
  updateEducationFormById,
  deleteEducationFormById,
  createEducationForm,
  getEducationForms,
};
