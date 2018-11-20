'use strict';

const express = require('express');
const router = express.Router();

const controller = require('../controllers/vaga-controller');

router.get('/buscar', controller.get);
router.post('/criar', controller.post);

module.exports = router;