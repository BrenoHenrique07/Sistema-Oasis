const { Sequelize, DataTypes } = require('sequelize');
const pacientes = require('../paciente/model');
const db = require('../db/connect');

const Responsavel = db.returnInstance().define('responsaveis', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true  
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sobrenome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rg: {
    type: DataTypes.STRING,
    allowNull: false   
  },
});

Responsavel.belongsTo(pacientes, { foreignKey: 'id_paciente' });

module.exports = Responsavel;
