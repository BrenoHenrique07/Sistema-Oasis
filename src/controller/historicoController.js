const database = require('../models');
const { Op } = require('sequelize');


async function findById(req, res) {
    try {
        const pacientesArray = await database.historicoDoencas.findAll({
            include: {
                model: database.doencas,
                as: 'doenca',
                attributes: ['nome']
            },
            where : {
                pacienteId: req.params.id
            }
        });
        res.status(200).json(pacientesArray);
    } catch(err) {
        res.status(500).json({mensagem:' Erro ao buscar histórico do paciente', erro: err.message});
    }
}

async function create(req, res) {
    try {
        const paciente = await database.historicoDoencas.create({
            pacienteId: req.body.pacienteId,
            doencaId: req.body.doencaId
        });
        
        res.status(200).json(paciente);
    } catch(err) {
        res.status(500).json({mensagem:' Erro ao criar histórico do paciente', erro: err.message});
    }
}


async function remove(req, res) {
    try {
        const paciente = await database.pacientes.findByPk(req.params.id);

        const historicoArray = await database.historicoDoencas.findAll({
            where : {
                pacienteId: paciente.id
            }
        })
    
        historicoArray.forEach(element => {
            element.destroy();
        });
        res.status(200).json({mensagem: `Histórico ${paciente.nome} excluído com sucesso`, ok: true});
    } catch(err) {
        res.status(500).json({mensagem:' Erro ao buscar paciente', erro: err.message});
    }
}

module.exports = {
    findById,
    create,
    remove
}