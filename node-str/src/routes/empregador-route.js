

'use strict';

const express = require('express');
const router = express.Router();

const controller = require('../controllers/empregador-controller');
const authService = require('../services/auth-service');

router.get('/buscar', controller.get);
router.get('/buscar/:nome', controller.getByNome);
router.get('/buscar/:id', controller.getById);
router.post('/criar', controller.post);
router.put('/editar/:id', controller.put);
router.delete('/deletar/:id', controller.delete);
router.post('/autenticacao', controller.authenticate);
router.post('/refresh-token', authService.authorize, controller.refreshToken);


module.exports = router;