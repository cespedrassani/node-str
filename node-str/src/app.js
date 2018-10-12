'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

// Conecta ao banco
mongoose.connect(config.connectionString);

// Carrega modelos
const Funcionario = require('./models/funcionario');
const Estabelecimento = require('./models/estabelecimento');
const Cidade = require('./models/cidade');

// Carrega as rotas
const indexRoute = require('./routes/index-route');
const funcionarioRoute = require('./routes/funcionario-route');
const estabalecimentoRoute = require('./routes/estabelecimento-route');
const cidadeRoute = require('./routes/cidade-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', indexRoute);
app.use('/funcionarios', funcionarioRoute);
app.use('/estabelecimentos', estabalecimentoRoute);
app.use('/cidades', cidadeRoute);

module.exports = app;