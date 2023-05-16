const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db/connect');

const Responsavel = db.returnInstance().define('responsaveis', {
  id_responsavel: {
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
}, {
  timestamps: false
});

module.exports = Responsavel;
