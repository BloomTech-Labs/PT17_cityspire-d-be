
exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('profiles', function (table) {
      table.string('id').notNullable().unique().primary();
      table.string('email');
      table.string('name');
      table.string('avatarUrl');
      table.timestamps(true, true);
    })
    .createTable('city', function (table) {
      table.increments();
      table.string('city');
      table.string('state');
      table.float('rental_price');
      table.string('crime');
      table.string('pollution');
      table.float('walkability');
      table.float('livability');
      table.timestamps(true, true);
    });
};

exports.down = (knex) => {
  return knex.schema
  .dropTableIfExists('city')
  .dropTableIfExists('profiles')
};
