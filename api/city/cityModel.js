const db = require('../../data/db-config');

const findAll = async () => {
  return await db('city');
};

const findBy = (filter) => {
  return db('city').where(filter);
};

const findById = async (id) => {
  return db('city').where({ id }).first().select('*');
};

const create = async (city) => {
  return db('city').insert(city).returning('*');
};

const update = (id, city) => {
  console.log(city);
  return db('city').where({ id: id }).first().update(city).returning('*');
};

const remove = async (id) => {
  return await db('city').where({ id }).del();
};

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
};
