

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

mongoose.connect(config.connectionString);

const Funcionario = require('./models/funcionario');
const Empregador = require('./models/empregador');
const Vaga = require('./models/vaga');
const Tipo = require('./models/tipo');
const Contrato = require('./models/contrato');

const indexRoute = require('./routes/index-route');
const funcionarioRoute = require('./routes/funcionario-route');
const empregadorRoute = require('./routes/empregador-route');
const vagaRoute = require('./routes/vaga-route');
const contratoRoute = require('./routes/contrato-route');

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(function (req, res, next) {
    res.header('Acces-Control-Allow-Origin', '*');
    res.header('Acces-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Acces-Control-Allow-Headers', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', indexRoute);
app.use('/funcionario', funcionarioRoute);
app.use('/empregador', empregadorRoute);
app.use('/vaga', vagaRoute);
app.use('/contrato', contratoRoute);

module.exports = app;