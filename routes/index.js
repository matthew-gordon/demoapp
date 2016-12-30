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

module.exports = router;
