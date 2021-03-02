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

async function add(city) {
  const [id] = await db('cities').insert(city, 'id');
  return db('cities').where({ id }).first();
}

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
  add,
  update,
  remove,
};
