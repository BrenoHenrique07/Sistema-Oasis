require('dotenv').config();
const database = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function create(req, res) {
    try {
        const senha = bcrypt.hashSync(req.body.senha, 8);

        const usuario = await database.usuarios.create({
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            email: req.body.email,
            senha: senha
        });
        
        res.status(200).json(usuario);
    } catch(err) {
        res.status(500).json({mensagem:' Erro ao criar usuario', erro: err.message});
    }
}

async function login(req, res) {
    try {
        const usuario = await database.usuarios.findOne(
            {   
                where : {
                    email: req.body.email
                }
            }
        );

        if(usuario.email == req.body.email && bcrypt.compareSync(req.body.senha, usuario.senha)) {
            const token = jwt.sign({id: usuario.id}, process.env.PG_SECRET, {
                expiresIn: 600
            });
            res.status(200).json({mensagem:'Login feito com sucesso', token});
        } else {
            res.status(200).json({mensagem:'Usuário ou senha incorreta!'});
        }
    } catch(err) {
        res.status(500).json({mensagem:' Erro ao logar com usuario', erro: err.message});
    }
}

async function logout (req, res) {
    res.end();
}
 
module.exports = {
    create,
    login,
    logout
}