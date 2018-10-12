'use strict';

const mongoose = require('mongoose');
const Cidade = mongoose.model('Cidade');

exports.getById = async (id) => {
    const res = await Cidade.findById(id);
    return res;
}


exports.create = async (data) => {
    var Cidade = new Cidade(data);
    await Cidade.save();
}