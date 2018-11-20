

'use-district'

const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => {
    try {
        var data = await jwt.sign(data, '', { expiresIn: '1d' });
    } catch(e) {
        console.log(e);
    }
    return data
}

exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, '');
    return data;
}

exports.authorize = function (rea, res, next)  {
    var token = req.body.token || req.query.token || req.headers['x-acces-token'];
    console.log('entrou no authorize');
    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        jwt.verify(token, '', function (erros, decoded) {
            if (erros) {
                res.status(401).json({
                    message: 'Token inválido'
                });
            } else {
                next();
            }
        });
    }
}