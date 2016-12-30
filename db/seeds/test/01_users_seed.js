'use strict';

exports.seed = function(knex, Promise) {
  return knex('users').del() // Deletes ALL existing entries
    .then(function() { // Inserts seed entries one by one in series
      return knex('users').insert({
        id: 1,
        name: 'Matt Gordon',
        email: 'matt@lax.com',
        bio: 'This is a relatively short bio.',
        super_user: true
      });
    }).then(function () {
      return knex('users').insert({
        id: 2,
        name: 'Brian Gordon',
        email: 'brian@lax.com',
        bio: 'This is a relatively short bio.'
      });
    }).then(function () {
      return knex('users').insert({
        id: 3,
        name: 'Josh Gordon',
        email: 'josh@lax.com',
        bio: 'This is a relatively short bio.'
      });
    })
    .then(() => {
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))");
    });
};
