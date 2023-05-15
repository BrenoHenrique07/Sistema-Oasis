const { Sequelize, DataTypes } = require('sequelize');
const pacientes = require('../paciente/model');
const doencas = require('../doencas/model');
const db = require('../db/connect');

const HistoricoDoencas = db.returnInstance().define('historico_doencas', {}, { timestamps: false });
pacientes.belongsToMany(doencas, {through: HistoricoDoencas});
doencas.belongsToMany(pacientes, {through: HistoricoDoencas});

module.exports = HistoricoDoencas;
