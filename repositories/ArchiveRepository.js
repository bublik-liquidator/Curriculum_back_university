const { Archive } = require('../models/Archive');
const { User } = require('../models/User');
const { Statuses } = require('../models/Status');
const { EducationForm } = require('../models/EducationForm');
const { Op } = require('sequelize');

const logger = require('../utils/logger');

async function getCurriculums(user, page, limit) {
  const offset = (page - 1) * limit;
  const where = user.isAdmin ? {} : { developerId: user.id };
  try {
    const curriculums = await Archive.findAll({
      where: where,
      offset: offset,
      limit: limit,
      order: [['id', 'ASC']],
      include: [
        {
          model: User,
          as: 'developer',
          attributes: [['name', 'developerName']],
        },
        {
          model: Statuses,
          as: 'status',
        },
        {
          model: EducationForm,
          as: 'educationForm',
          attributes: [['name', 'educationFormName']],
        },
      ],
    });
    const totalCurriculums = await Archive.count({ where: where });
    const transformedCurriculums = curriculums.map((curriculum) => {
      const data = curriculum.get({ plain: true });
      data.developerName = data.developer.developerName;
      data.statusName = data.status.name;
      if (data.educationForm) {
        data.educationFormName = data.educationForm.educationFormName;
      } else {
        data.educationFormName = 'Не указано';
      }
      delete data.developer;
      delete data.status;
      delete data.educationForm;
      return data;
    });

    return {
      curriculums: transformedCurriculums,
      total: totalCurriculums,
    };
  } catch (err) {
    logger.error('Произошла ошибка при поиске куррикулумов 45', err);
    throw err;
  }
}

async function searchCurriculums(user, searchQuery, limit, page) {
  const offset = (page - 1) * limit;
  const where = user.isAdmin ? { title: { [Op.like]: searchQuery + '%' } } : { developerId: user.id, title: { [Op.like]: searchQuery + '%' } };

  try {
    const curriculums = await Archive.findAll({
      where: where,
      limit: limit,
      offset: offset,
      order: [['id', 'ASC']],
      include: [
        {
          model: User,
          as: 'developer',
          attributes: [['name', 'developerName']],
        },
        {
          model: Statuses,
          as: 'status',
        },
        {
          model: EducationForm,
          as: 'educationForm',
          attributes: [['name', 'educationFormName']],
        },
      ],
    });

    const totalCurriculums = await Archive.count({ where: where });
    const transformedCurriculums = curriculums.map((curriculum) => {
      const data = curriculum.get({ plain: true });
      data.developerName = data.developer.developerName;
      data.statusName = data.status.name;
      if (data.educationForm) {
        data.educationFormName = data.educationForm.educationFormName;
      } else {
        data.educationFormName = 'Не указано';
      }
      delete data.developer;
      delete data.status;
      delete data.educationForm;
      return data;
    });

    return {
      user,
      searchQuery,
      limit,
      page,
      curriculums: transformedCurriculums,
      total: totalCurriculums,
    };
  } catch (err) {
    logger.error('Произошла ошибка при поиске куррикулумов 46', err);
    throw err;
  }
}

async function getExpiringCurriculums(user, page, limit) {
  const offset = (page - 1) * limit;
  const where = user.isAdmin ? {} : { developerId: user.id };
  const soonExpiringDate = new Date();
  soonExpiringDate.setDate(soonExpiringDate.getDate() + 30); // срок истечения в течение следующих 30 дней
  where.expiryDate = { [Op.lte]: soonExpiringDate };

  try {
    const curriculums = await Archive.findAll({
      where: where,
      offset: offset,
      limit: limit,
      order: [['expiryDate', 'ASC']],
      include: [
        {
          model: User,
          as: 'developer',
          attributes: [['name', 'developerName']],
        },
        {
          model: Statuses,
          as: 'status',
        },
        {
          model: EducationForm,
          as: 'educationForm',
          attributes: [['name', 'educationFormName']],
        },
      ],
    });
    const totalCurriculums = await Archive.count({ where: where });
    const transformedCurriculums = curriculums.map((curriculum) => {
      const data = curriculum.get({ plain: true });
      data.developerName = data.developer.developerName;
      data.statusName = data.status.name;
      if (data.educationForm) {
        data.educationFormName = data.educationForm.educationFormName;
      } else {
        data.educationFormName = 'Не указано';
      }
      delete data.developer;
      delete data.status;
      delete data.educationForm;
      return data;
    });

    return {
      curriculums: transformedCurriculums,
      total: totalCurriculums,
    };
  } catch (err) {
    logger.error('Произошла ошибка при поиске куррикулумов 47', err);
    throw err;
  }
}

async function getCurriculumById(curriculumId) {
  const curriculum = await Archive.findOne({
    where: { id: curriculumId },
    include: [
      {
        model: User,
        as: 'developer',
        attributes: [['name', 'developerName']],
      },
      {
        model: Statuses,
        as: 'status',
      },
      {
        model: EducationForm,
        as: 'educationForm',
        attributes: [['name', 'educationFormName']],
      },
    ],
  });

  const { developer, status, educationForm, ...curriculumData } = curriculum.toJSON();
  curriculumData.developerName = developer.developerName;
  curriculumData.statusName = status.name;
  if (educationForm) {
    curriculumData.educationFormName = educationForm.educationFormName;
  } else {
    curriculumData.educationFormName = 'Не указано';
  }

  return curriculumData;
}

async function getCurriculumStatusById(curriculumId) {
  const curriculum = await Archive.findOne({
    where: { id: curriculumId },
    include: [
      {
        model: Statuses,
        as: 'status',
      },
    ],
  });

  return {
    ...curriculum.toJSON(),
    statusName: curriculum.status.name,
  };
}

module.exports = {
  getCurriculums,
  getCurriculumById,
  getCurriculumStatusById,
  getExpiringCurriculums,
  searchCurriculums,
};
