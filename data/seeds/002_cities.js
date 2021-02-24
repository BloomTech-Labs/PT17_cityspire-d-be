exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cities').del()
    .then(function () {
      return knex('cities').insert([
        { id: '1', city: 'wichita', state: 'Kansas', rental_price: '850', crime: 'medium', air_quality_index: 'low', diversity_index: '58', walkability: '2.0', livability: '85', profile_id:'00ulthapbErVUwVJy4x6'},
        { id: '2', city: 'Atlanta', state: 'Georgia', rental_price: '850', crime: 'medium', air_quality_index: 'low', diversity_index: '58', walkability: '2.0', livability: '85', profile_id:'00ulthapbErVUwVJy4x6'},
      ]);
    });
};