'use strict';

const express = require('express');
const router = express.Router();

const queries = require('../db/queries');

// *** GET all users *** //
router.get('/users', (req, res, next) => {
  queries.getAll()
  .then((users) => {
    res.status(200).json(users);
  })
  .catch((error) => {
    next(error);
  });
});

// *** GET single user *** //
router.get('/users/:id', (req, res, next) => {
  queries.getSingle(req.params.id)
  .then((user) => {
    res.status(200).json(user);
  })
  .catch((error) => {
    next(error);
  });
});

// *** POST create new user *** //
router.post('/users', (req, res, next) => {
  queries.add(req.body)
  .then((userID) => {
    return queries.getSingle(userID);
  })
  .then((user) => {
    res.status(200).json(user);
  })
  .catch((error) => {
    next(error);
  });
});

// *** PUT update a user by id *** //
router.put('/users/:id', (req, res, next) => {
  if(req.body.hasOwnProperty('id')) {
    return res.status(422).json({
      error: 'You cannot update the id field'
    });
  }
  queries.update(req.params.id, req.body)
  .then(() => {
    return queries.getSingle(req.params.id);
  })
  .then((user) => {
    res.status(200).json(user);
  })
  .catch((error) => {
    next(error);
  });
});

// *** DELETE a user by id *** //
router.delete('/users/:id', (req, res, next) => {
  queries.getSingle(req.params.id)
  .then((user) => {
    queries.deleteItem(req.params.id)
    .then(() => {
      res.status(200).json(user);
    })
    .catch((error) => {
      next(error);
    });
  }).catch((error) => {
    next(error);
  });
});

module.exports = router;
