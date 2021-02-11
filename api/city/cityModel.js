const db = require('../../data/db-config');

const findAll = async () => {
  return await db('cities');
};

const findBy = (filter) => {
  return db('cities').where(filter);
};

const findById = async (id) => {
  return db('cities').where({ id }).first();
};

const create = async (city) => {
  return db('cities').insert(city).returning('*');
};

const update = (id, city) => {
  console.log(city);
  return db('cities').where({ id: id }).first().update(city).returning('*');
};

const remove = async (id) => {
  return await db('cities').where({ id }).del();
};

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
};
