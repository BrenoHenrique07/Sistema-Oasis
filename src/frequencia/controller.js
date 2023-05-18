require('dotenv').config()
const { json, QueryTypes } = require('sequelize');
const frequencia = require('../frequencia/model');
const pacientes = require('../paciente/model');
const db = require('../db/connect');

async function findAll(req, res) {
    try {
        const frequenciaArray = await frequencia.findAll({include: pacientes});
        res.json(frequenciaArray);
    } catch(err) {
        res.status(404).json({mensagem:' Erro ao buscar frequencias', erro: err.message});
    }
}

async function findByName(req, res) {
    
}

async function create(req, res) {
    try {
        const frequencia = await frequencia.create({
            data_hora : req.body.data_hora
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
