const {Sequelize} = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize(`postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@localhost:5432/oasis`); 

function returnInstance(){
    return sequelize;
}

function openConnection() {
    try{
        sequelize.authenticate();
        console.log('Connection has been established');
    } catch (err) {
        console.log('Connnection error: ', err);
    }
}

function closeConnection() {
    try{
        sequelize.close();
        console.log('Connection was closed');
    } catch (err) {
        console.log('Closed connnection error: ', err);
    }
}

async function syncDataBase() {
    let Paciente = require('../paciente/model');
    let Frequencia = require('../frequencia/model');
    let Responsavel = require('../responsavel/model');
    let Doencas = require('../doencas/model');
    let HistoricoDoencas = require('../historicoDoencas/model');

    await Paciente.sync();
    await Frequencia.sync();
    await Responsavel.sync();
    await Doencas.sync();
    await HistoricoDoencas.sync();
}

module.exports = {
    syncDataBase,
    openConnection,
    closeConnection,
    returnInstance
};