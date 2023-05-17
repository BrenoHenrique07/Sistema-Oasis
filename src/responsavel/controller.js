require('dotenv').config()
const { json, QueryTypes } = require('sequelize');
const db = require('../db/connect');
const responsaveis = require('../responsavel/model');
const pacientes = require('../paciente/model');

async function findAll(req, res) {
    try {
        const responsaveisArray = await responsaveis.findAll({include: pacientes});
        res.json(responsaveisArray);
    } catch(err) {
        res.status(404).json({mensagem:' Erro ao buscar responséveis', erro: err.message});
    }
}

async function findByName(req, res) {
    try {
        const query = 'SELECT responsaveis.nome, responsaveis.sobrenome, responsaveis.cpf, responsaveis.rg, pacientes.nome AS pacientes_nome, pacientes.sobrenome AS pacientes_sobrenome, pacientes.cpf AS pacientes_cpf FROM responsaveis INNER JOIN pacientes ON pacientes.id_paciente = responsaveis.id_paciente WHERE responsaveis.nome = :nome';
        const responsavel = await db.returnInstance().query(query, {
            replacements: {nome: `${req.params.nome}` || ''},
            type: QueryTypes.SELECT
        });
        res.json(responsavel);
    } catch(err) {
        res.status(404).json({mensagem:' Erro ao buscar responsável', erro: err.message});
    }
}

async function create(req, res) {
    try {
        const responsavel = await responsaveis.create({
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            cpf: req.body.cpf,
            rg: req.body.rg,
            id_paciente: req.body.id_paciente
        });
        
        res.json(responsavel);
    } catch(err) {
        res.status(404).json({mensagem:' Erro ao criar responsável', erro: err.message});
    }
}

async function alter(req, res) {

    try {
        const verificacao = await responsaveis.update({
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            cpf: req.body.cpf,
            rg: req.body.rg
        },{
            where: {
                id_responsavel: req.params.id
            }
        });

        if(verificacao > 0) {
            const responsavel = await responsaveis.findByPk(req.params.id);
            res.json(responsavel);
        } else {
            res.json({mensagem: "Responsável inexistente"});
        }
    } catch(err) {
        res.status(404).json({mensagem:' Erro ao buscar responsável', erro: err.message});
    }
}

async function remove(req, res) {
    try {
        const responsavel = await responsaveis.findByPk(req.params.id);

        res.json({mensagem: `${responsavel.nome} excluído com sucesso`});
        responsavel.destroy();
    } catch(err) {
        res.status(404).json({mensagem:' Erro ao buscar responsável', erro: err.message});
    }
}

module.exports = {
    findAll,
    findByName,
    create,
    alter,
    remove
}
