const { Statuses } = require('../models/Status');
const { Curriculum } = require('../models/Curriculum');

async function getStatuses() {
  try {
    const statuses = await Statuses.findAll();

    if (!statuses) {
      throw new Error('Не удалось получить статусы');
    }

    return statuses;
  } catch (err) {
    throw err;
  }
}

async function getStatusById(StatusId) {
  try {
    const status = await Statuses.findOne({
      where: {
        id: StatusId,
      },
    });

    if (!status) {
      throw new Error('Статус с данным ID не найден');
    }

    return status;
  } catch (err) {
    throw err;
  }
}

async function updateStatusById(StatusId, updateStatus) {
  try {
    const { title: name } = updateStatus;
    const updatedStatus = await Statuses.update(
      { name },
      {
        where: {
          id: StatusId,
        },
      },
    );

    if (!updatedStatus) {
      throw new Error('Не удалось обновить статус. Проверьте, существует ли статус с данным ID');
    }

    return updatedStatus;
  } catch (err) {
    throw err;
  }
}

async function createStatus(Status) {
  try {
    const { title: name } = Status;
    const createdStatus = await Statuses.create({ name });

    if (!createdStatus) {
      throw new Error('Не удалось создать статус');
    }

    return createdStatus;
  } catch (err) {
    throw err;
  }
}

async function deleteStatusById(StatusId) {
  try {
    const curriculums = await Curriculum.findAll({
      where: {
        statusId: StatusId,
      },
    });

    if (curriculums.length > 0) {
      const curriculumNames = curriculums.map((curriculum) => curriculum.title).join(', ');
      throw new Error(`Существуют программа(ы): (${curriculumNames}), которые используют этот статус. Удаление невозможно.`);
    }

    const deletedStatus = await Statuses.destroy({
      where: {
        id: StatusId,
      },
    });

    if (!deletedStatus) {
      throw new Error('Не удалось удалить статус. Проверьте, существует ли статус с данным ID');
    }
    return deletedStatus;
  } catch (err) {
    throw err;
  }
}
module.exports = {
  getStatusById,
  updateStatusById,
  deleteStatusById,
  createStatus,
  getStatuses,
};
