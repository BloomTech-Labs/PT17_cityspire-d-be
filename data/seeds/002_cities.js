
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('city').del()
    .then(function () {
      // Inserts seed entries
      return knex('city').insert([
        {id: 1, city: 'wichita', state: 'Kansas', rental_price: '850', crime: 'medium', pollution: 'low', walkability: '2.0', livability: '85'},
      ]);
    });
};