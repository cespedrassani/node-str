'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

// Conecta ao banco
mongoose.connect('mongodb://carlos:carlos123@ds018538.mlab.com:18538/node-str');

// Carrega modelos
const Funcionario = require('./models/funcionario');
const Estabelecimento = require('./models/estabelecimento');

// Carrega as rotas
const indexRoute = require('./routes/index-route');
const funcionarioRoute = require('./routes/funcionario-route');
const estabalecimentoRoute = require('./routes/estabelecimento-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', indexRoute);
app.use('/funcionarios', funcionarioRoute);
app.use('/estabelecimentos', estabalecimentoRoute);

module.exports = app;