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
        res.status(404).json({mensagem:' Erro ao buscar frequencias', erro: err.message});
    }
}

async function findByName(req, res) {
    
}

async function create(req, res) {
    console.log(req.body);
    try {
        const frequencia = await database.frequencia.create({
            pacienteId: req.body.pacienteId
        });
        
        res.json(frequencia);
    } catch(err) {
        res.status(404).json({mensagem:' Erro ao criar frequencia', erro: err.message});
    }
}

async function remove(req, res) {

}

module.exports = {
    findAll,
    findByName,
    create,
    remove
}