exports.up = function (knex) {
  return knex.schema.createTable('user', function (table) {
    table.increments('id');
    table.string('username', 255).notNullable().unique();
    table.string('hashed_password', 255).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('user');
};
