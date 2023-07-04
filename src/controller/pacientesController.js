const database = require('../models');
const { Op, where } = require('sequelize');

async function findAll(req, res) {
    try {
        const pacientesArray = await database.pacientes.findAll({
            include: {
                model: database.responsaveis,
                as: 'responsavel',
                on: {
                    '$pacientes.id$': { [Op.col]: 'responsavel.pacienteId' }
                }
            }
        });
        res.status(200).json(pacientesArray);
    } catch(err) {
        res.status(500).json({mensagem:' Erro ao buscar pacientes', erro: err.message});
    }
}

async function findByName(req, res) {
    try {
        const paciente = await database.pacientes.findAll(
            {   
                include: {
                    model: database.responsaveis,
                    as: 'responsavel',
                    on: {
                        '$pacientes.id$': { [Op.col]: 'responsavel.pacienteId' }
                    }
                },
                where : {
                    nome: req.params.nome
                }
            }
        );
        res.status(200).json(paciente);
    } catch(err) {
        res.status(500).json({mensagem:' Erro ao buscar paciente', erro: err.message});
    }
}

async function findByPk(req, res) {
    try {
        const paciente = await database.pacientes.findByPk(req.params.id);
        res.status(200).json(paciente);
    } catch(err) {
        res.status(500).json({mensagem:' Erro ao buscar paciente', erro: err.message});
    }
}


async function create(req, res) {

    try {
        var verificacao = await database.pacientes.findAll({
            where: {
                cpf: req.body.cpf
            }
        });

        if(verificacao.length === 0) {   
            try {
                const paciente = await database.pacientes.create({
                    nome: req.body.nome,
                    sobrenome: req.body.sobrenome,
                    cpf: req.body.cpf,
                    endereco: req.body.endereco,
                    doenca: req.body.doenca,
                    dataNascimento: req.body.dataNascimento
                });
                
                res.status(200).json(paciente);
            } catch(err) {
                res.status(500).json({mensagem:' Erro ao criar paciente', erro: err.message});
            }
        } else {
            res.status(500).json({mensagem:' Paciente existente'});
        }
    } catch (err) {
        res.status(500).json({mensagem:' Erro ao buscar paciente', erro: err.message});
    }
}

async function alter(req, res) {

    try {
        const verificacao = await database.pacientes.update({
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            cpf: req.body.cpf,
            endereco: req.body.endereco,
            doenca: req.body.doenca,
            dataNascimento: req.body.dataNascimento
        },{
            where: {
                id: req.params.id
            }
        });

        if(verificacao > 0) {
            const paciente = await database.pacientes.findByPk(req.params.id);
            res.status(200).json(paciente);
        } else {
            res.status(200).json({mensagem: "Paciente inexistente"});
        }
    } catch(err) {
        res.status(500).json({mensagem:' Erro ao buscar paciente', erro: err.message});
    }
}

async function remove(req, res) {
    try {
        let verify = null;

        if(verify == null) {
            verify = await database.responsaveis.findAll({
                where: {
                    pacienteId: req.params.id
                }
            })
        } 

        if(verify.length === 0) {
            verify = await database.frequencia.findAll({
                where: {
                    pacienteId: req.params.id
                }
            })
        }

        if(verify.length === 0) {
            verify = await database.historicoDoencas.findAll({
                where: {
                    pacienteId: req.params.id
                }
            })
        }

        if(verify.length === 0) {  
            const paciente = await database.pacientes.findByPk(req.params.id);

            let nomePaciente = paciente.nome;
            paciente.destroy();  
            res.status(200).json({mensagem: `${nomePaciente} excluído com sucesso`, ok: true}); 
        } else {
            res.status(200).json({mensagem: `Paciente não pode ser exluído no momento`, ok: false}); 
        }
    } catch(err) {
        res.status(500).json({mensagem:' Erro ao buscar paciente', erro: err.message});
    }
}

module.exports = {
    findAll,
    findByName,
    findByPk,
    create,
    alter,
    remove
}