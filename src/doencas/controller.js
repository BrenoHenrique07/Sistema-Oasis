require('dotenv').config()
const { json, QueryTypes } = require('sequelize');
const doencas = require('../doencas/model');
const db = require('../db/connect');

async function findAll(req, res) {
    try {
        const doencasArray = await doencas.findAll();
        res.json(doencasArray);
    } catch(err) {
        res.status(404).json({mensagem:' Erro ao buscar doenças', erro: err.message});
    }
}

async function findByName(req, res) {
    try {
        const doenca = await doencas.findAll(
            {
                where : {
                    nome: req.params.nome
                }
            }
        );
        res.json(doenca);
    } catch(err) {
        res.status(404).json({mensagem:' Erro ao buscar doenças', erro: err.message});
    }
}

async function create(req, res) {
    try {
        const doenca = await doencas.create({
            nome: req.body.nome
        });
        
        res.json(doenca);
    } catch(err) {
        res.status(404).json({mensagem:' Erro ao criar doença', erro: err.message});
    }
}

async function alter(req, res) {

    try {
        const verificacao = await doencas.update({
            nome: req.body.nome,
        },{
            where: {
                id_doenca: req.params.id
            }
        });

        if(verificacao > 0) {
            const doenca = await doencas.findByPk(req.params.id);
            res.json(doenca);
        } else {
            res.json({mensagem: "Doença inexistente"});
        }
    } catch(err) {
        res.status(404).json({mensagem:' Erro ao buscar doença', erro: err.message});
    }
}

async function remove(req, res) {
    try {
        const doenca = await doencas.findByPk(req.params.id);

        res.json({mensagem: `${doenca.nome} excluído com sucesso`});
        doenca.destroy();
    } catch(err) {
        res.status(404).json({mensagem:' Erro ao buscar doença', erro: err.message});
    }
}

module.exports = {
    findAll,
    findByName,
    create,
    alter,
    remove
}
