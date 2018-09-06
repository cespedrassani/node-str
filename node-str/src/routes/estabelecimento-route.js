'use strict';

const express = require('express');
const router = express.Router();

const controller = require('../controllers/estabelecimento-controller');

router.get('/', controller.get);
router.get('/:nome', controller.getByNome);
router.get('/admin/:id', controller.getById);
router.get('/ramos/:ramo', controller.getByRamo);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/', controller.delete);

module.exports = router;