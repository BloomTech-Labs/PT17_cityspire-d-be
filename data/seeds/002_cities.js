
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('city').del()
    .then(function () {
      // Inserts seed entries
      return knex('city').insert([
        { city: 'wichita', state: 'Kansas', rental_price: '850', crime: 'medium', pollution: 'low', walkability: '2.0', livability: '85', profiles_id: '00ulthapbErVUwVJy4x6'},
        { city: 'Atlanta', state: 'Georgia', rental_price: '850', crime: 'medium', pollution: 'low', walkability: '2.0', livability: '85', profiles_id: '00ulthapbErVUwVJy4x6'},
      ]);
    });
};