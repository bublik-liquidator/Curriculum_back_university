const fs = require('fs');
const jwt = require('jsonwebtoken');
const { Curriculum } = require('../models/Curriculum');
const { User } = require('../models/User');
const { Statuses } = require('../models/Status');
const { EducationForm } = require('../models/EducationForm');
const { CurriculumSpecialty } = require('../models/CurriculumSpecialty');
const { getSpecialties } = require('../repositories/SpecialtyRepository');
const { Op } = require('sequelize');

const logger = require('../utils/logger');

async function getCurriculums(user, page, limit) {
  const offset = (page - 1) * limit;
  const where = user.isAdmin ? {} : { developerId: user.id };
  try {
    const curriculums = await Curriculum.findAll({
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
    const totalCurriculums = await Curriculum.count({ where: where });
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
    logger.error('Произошла ошибка при поиске куррикулумов', err);
    throw err;
  }
}

async function searchCurriculums(user, searchQuery, limit, page) {
  const offset = (page - 1) * limit;
  const where = user.isAdmin ? { title: { [Op.like]: searchQuery + '%' } } : { developerId: user.id, title: { [Op.like]: searchQuery + '%' } };

  try {
    const curriculums = await Curriculum.findAll({
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

    const totalCurriculums = await Curriculum.count({ where: where });
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
    logger.error('Произошла ошибка при поиске куррикулумов', err);
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
    const curriculums = await Curriculum.findAll({
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
    const totalCurriculums = await Curriculum.count({ where: where });
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
    logger.error('Произошла ошибка при поиске куррикулумов', err);
    throw err;
  }
}

async function getCurriculumById(curriculumId) {
  const curriculum = await Curriculum.findOne({
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
  const curriculum = await Curriculum.findOne({
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

async function saveCurriculum(id) {
  const curriculum = await Curriculum.findOne({ where: { id } });
  if (!curriculum) {
    throw new Error('Plan not found');
  }
  const fileBuffer = curriculum.filePath;
  const originalFileName = curriculum.fileName;
  return {
    file: fileBuffer,
    fileName: originalFileName,
    contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  };
}

async function updateCurriculum(id, file) {
  const curriculum = await Curriculum.findByPk(id);
  if (!curriculum) {
    throw new Error('Куррикулум не найден');
  }

  const wordFile = file.buffer;
  curriculum.filePath = wordFile;
  await curriculum.save();
  return curriculum;
}

async function updateCurriculumInfo(id, curriculumData) {
  const { title, year, statusName, developerName, expiryDate, educationFormName } = curriculumData;

  const developer = await User.findOne({ where: { name: developerName } });
  const developerId = developer ? developer.id : 1;

  const status = await Statuses.findOne({ where: { name: statusName } });
  const statusId = status ? status.id : 1;

  const educationForm = await EducationForm.findOne({ where: { name: educationFormName } });
  const educationFormId = educationForm ? educationForm.id : 1;

  await Curriculum.update(
    {
      title,
      year,
      statusId,
      lastModified: Date.now(),
      developerId,
      expiryDate,
      educationFormId,
    },
    {
      where: { id },
    }
  );
  const specialties = await getSpecialties();
  for (let i = 0; i < specialties.length; i++) {
    if (curriculumData[specialties[i].name]) {
      const existingRecord = await CurriculumSpecialty.findOne({
        where: {
          curriculumId: id,
          specialtyId: specialties[i].id,
        },
      });
      if (!existingRecord) {
        try {
          await CurriculumSpecialty.create({
            curriculumId: id,
            specialtyId: specialties[i].id,
          });
        } catch (error) {
          console.error(`Ошибка при обновлении учебной программы:  ${error}`);
        }
      }
    } else {
      try {
        await CurriculumSpecialty.destroy({
          where: {
            curriculumId: id,
            specialtyId: specialties[i].id,
          },
        });
      } catch (error) {
        console.error(`Ошибка при уничтожении curriculum_specialty: ${error}`);
      }
    }
  }
}

async function createCurriculum(curriculumData, file) {
  const { title, year, statusName, developerName, expiryDate, educationFormName, filePath } = curriculumData;

  const status = await Statuses.findOne({ where: { name: statusName } });
  const developer = await User.findOne({ where: { name: developerName } });
  const statusId = status ? status.id : 1;
  const developerId = developer ? developer.id : 1;

  const educationForm = await EducationForm.findOne({ where: { name: educationFormName } });
  const educationFormId = educationForm ? educationForm.id : 1;

  const wordFile = file.buffer;
  curriculumData.filePath = wordFile;
  const newCurriculum = await Curriculum.create({
    title,
    year,
    statusId,
    lastModified: Date.now(),
    developerId,
    expiryDate,
    educationFormId,
    filePath: wordFile,
  });

  const specialties = await getSpecialties();
  for (let i = 0; i < specialties.length; i++) {
    if (curriculumData[specialties[i].name]) {
      try {
        await CurriculumSpecialty.create({
          curriculumId: newCurriculum.id,
          specialtyId: specialties[i].id,
        });
      } catch (error) {
        console.error(`Ошибка при создании учебной программы curriculum_specialty: ${error}`);
      }
    }
  }

  return newCurriculum;
}

async function deleteCurriculum(id) {
  const curriculum = await Curriculum.findByPk(id);
  if (!curriculum) {
    throw new Error('Куррикулум не найден');
  }
  await CurriculumSpecialty.destroy({ where: { curriculumId: id } });
  await curriculum.destroy();
}

async function sortCurriculums(sortBy, token) {
  const user = jwt.verify(token, process.env.SECRET);
  if (user.isAdmin) {
    return await Curriculum.findAll({
      include: User,
      order: [[sortBy, 'ASC']],
    });
  } else {
    return await Curriculum.findAll({
      where: { user_id: user.id },
      include: User,
      order: [[sortBy, 'ASC']],
    });
  }
}

module.exports = {
  getCurriculums,
  getCurriculumById,
  getCurriculumStatusById,
  updateCurriculum,
  getExpiringCurriculums,
  updateCurriculumInfo,
  createCurriculum,
  saveCurriculum,
  sortCurriculums,
  searchCurriculums,
  deleteCurriculum,
};
