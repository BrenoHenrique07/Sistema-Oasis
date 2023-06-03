require('dotenv').config();
const database = require('../models');
const jwt = require('jsonwebtoken');

async function eAdmin (req, res, next) {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({mensagem: 'Necessário realizar o login para realizar a página'});
    }

    const [bearer, token] = authHeader.split(' ');

    try {
        const payload = jwt.verify(token, process.env.PG_SECRET);
        const usuario =  database.usuarios.findByPk(payload.id);

        if (!usuario) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }

        req.usuario = usuario;
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido' });
    }
}

module.exports = {
    eAdmin
}