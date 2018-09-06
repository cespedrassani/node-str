'use strict';

const express = require('express');
const router = express.Router();

const controller = require('../controllers/funcionario-controller');

router.get('/', controller.get);
router.get('/:nome', controller.getByNome);
router.get('/admin/:id', controller.getById);
router.get('/funcoes/:funcao', controller.getByFuncao);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/', controller.delete);

module.exports = router;