'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          id: 1,
          name: 'Matt Gordon',
          email: 'matt@lax.com',
          bio: 'This is a relatively short bio.',
          super_user: true
        }),
        knex('users').insert({
          id: 2,
          name: 'Brian Gordon',
          email: 'brian@lax.com',
          bio: 'This is a relatively short bio.'
        }),
        knex('users').insert({
          id: 3,
          name: 'Josh Gordon',
          email: 'josh@lax.com',
          bio: 'This is a relatively short bio.'
        }),
      ]);
    });
};
