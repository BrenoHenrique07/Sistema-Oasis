const database = require('../models');
const { Op } = require('sequelize');

async function findAll(req, res) {
    try {
        const frequenciaArray = await database.frequencia.findAll({
            include: {
                model: database.pacientes,
                as: 'paciente',
                on: {
                    '$frequencia.pacienteId$': { [Op.col]: 'paciente.id' }
                }
            }
        });
        res.json(frequenciaArray);
    } catch(err) {
        res.status(500).json({mensagem:' Erro ao buscar frequencias', erro: err.message});
    }
}

async function findById(req, res) {
    try {
        const paciente = await database.frequencia.findAll(
            {   
                include: {
                    model: database.pacientes,
                    as: 'paciente',
                    on: {
                        '$frequencia.pacienteId$': { [Op.col]: 'paciente.id' }
                    }
                },
                where : {
                    pacienteId: req.params.id
                }
            }
        );
        res.json(paciente);
    } catch(err) {
        res.status(500).json({mensagem:' Erro ao buscar paciente', erro: err.message});
    }
}

async function create(req, res) {
    console.log(req.body);
    try {
        const frequencia = await database.frequencia.create({
            pacienteId: req.body.pacienteId
        });
        
        res.json(frequencia);
    } catch(err) {
        res.status(500).json({mensagem:' Erro ao criar frequencia', erro: err.message});
    }
}

async function remove(req, res) {
    try {
        const frequenciaArray = await database.frequencia.findAll({
            where : {
                pacienteId: req.params.id
            }
        })

        frequenciaArray.forEach(element => {
            element.destroy();
        });
        res.json({mensagem: `Frequência ${paciente.nome} excluído com sucesso`});
    } catch(err) {
        res.status(500).json({mensagem:' Erro ao buscar paciente', erro: err.message});
    }
}

module.exports = {
    findAll,
    findById,
    create,
    remove
}