const bcrypt = require('bcrypt');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('user')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        { username: 'admin', hashed_password: bcrypt.hashSync('admin', 10) },
      ]);
    });
};
