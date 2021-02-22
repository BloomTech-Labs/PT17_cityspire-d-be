exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cities').del()
    .then(function () {
      return knex('cities').insert([
        { city: 'wichita', state: 'Kansas', rental_price: '850', crime: 'medium', air_quality_index: 'low', walkability: '2.0', livability: '85', profile_id:'00ulthapbErVUwVJy4x6'},
        { city: 'Atlanta', state: 'Georgia', rental_price: '850', crime: 'medium', air_quality_index: 'low', walkability: '2.0', livability: '85', profile_id:'00ulthapbErVUwVJy4x6'},
      ]);
    });
};