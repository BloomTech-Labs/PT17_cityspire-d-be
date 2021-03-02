const db = require('../../data/db-config');

const findAll = async () => {
  return await db('profiles');
};

const findBy = (filter) => {
  return db('profiles').where(filter);
};

const findById = async (id) => {
  return db('profiles').where({ id }).first().select('*');
};

const create = async (profile) => {
  return db('profiles').insert(profile).returning('*');
};

const update = (id, profile) => {
  console.log(profile);
  return db('profiles')
    .where({ id: id })
    .first()
    .update(profile)
    .returning('*');
};

const remove = async (id) => {
  return await db('profiles').where({ id }).del();
};

const findOrCreateProfile = async (profileObj) => {
  const foundProfile = await findById(profileObj.id).then((profile) => profile);
  if (foundProfile) {
    return foundProfile;
  } else {
    return await create(profileObj).then((newProfile) => {
      return newProfile ? newProfile[0] : newProfile;
    });
  }
};
const findCities = async (id) => {
  return db('profiles')
    .where('cities.profile_id', id)
    .join('cities', 'cities.profile_id', 'profiles.id')
    .select(
      'cities.id',
      'city',
      'state',
      'diversity_index',
      'population',
      'rental_price',
      'crime',
      'air_quality_index',
      'livability',
      'walkability',
      'latitude',
      'longitude'
    );
};

const deleteCity = async (id) => {
  return db('profiles')
    .where('cities.profile_id', id)
    .join('cities', 'cities.profile_id', 'profiles.id')
    .del();
};

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
  findOrCreateProfile,
  findCities,
  deleteCity,
};
