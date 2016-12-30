'use strict';

const express = require('express');
const router = express.Router();

// *** GET all *** //
router.get('/users', (req, res, next) => {
  res.send('Send info back');
});

module.exports = router;
