const database = require('../models');
const { Op } = require('sequelize');

async function findAll(req, res) {
    try {
        const responsaveisArray = await database.responsaveis.findAll({
            include: {
                model: database.pacientes,
                as: 'paciente',
                on: {
                    '$responsaveis.pacienteId$': { [Op.col]: 'paciente.id' }
                }
            }
        });
        res.json(responsaveisArray);
    } catch(err) {
        res.status(500).json({mensagem:' Erro ao buscar responsáveis', erro: err.message});
    }
}

async function findByName(req, res) {
    try {
        const responsavel = await database.responsaveis.findAll(
            {   
                include: {
                    model: database.pacientes,
                    as: 'paciente',
                    on: {
                        '$responsaveis.pacienteId$': { [Op.col]: 'paciente.id' }
                    }
                },                
                where : {
                    nome: req.params.nome
                }
            });
        res.json(responsavel);
    } catch(err) {
        res.status(500).json({mensagem:' Erro ao buscar responsável', erro: err.message});
    }
}

async function create(req, res) {
    try {
        const responsavel = await database.responsaveis.create({
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            cpf: req.body.cpf,
            rg: req.body.rg,
            pacienteId: req.body.pacienteId
        });
        
        res.json(responsavel);
    } catch(err) {
        res.status(500).json({mensagem:' Erro ao criar responsável', erro: err.message});
    }
}

async function alter(req, res) {

    try {
        const verificacao = await database.responsaveis.update({
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            cpf: req.body.cpf,
            rg: req.body.rg
        },{
            where: {
                id: req.params.id
            }
        });

        if(verificacao > 0) {
            const responsavel = await database.responsaveis.findByPk(req.params.id);
            res.json(responsavel);
        } else {
            res.json({mensagem: "Responsável inexistente"});
        }
    } catch(err) {
        res.status(500).json({mensagem:' Erro ao buscar responsável', erro: err.message});
    }
}

async function remove(req, res) {
    try {
        const responsavel = await database.responsaveis.findByPk(req.params.id);

        res.json({mensagem: `${responsavel.nome} excluído com sucesso`});
        responsavel.destroy();
    } catch(err) {
        res.status(500).json({mensagem:' Erro ao buscar responsável', erro: err.message});
    }
}

module.exports = {
    findAll,
    findByName,
    create,
    alter,
    remove
}