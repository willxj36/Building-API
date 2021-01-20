const express = require('express');
const chirpRouter = require('./chirps');
const router = express.Router();

router.use('/chirps', chirpRouter);

module.exports = router;