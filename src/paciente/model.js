const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db/connect');

const Paciente = db.returnInstance().define('Paciente', {
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
  endereco: {
    type: DataTypes.STRING,
    allowNull: false   
  },
  doenca: {
    type: DataTypes.STRING,
    allowNull: false   
  },
  historico_doencas: {
    type: DataTypes.STRING,
    allowNull: false   
  },
  data_nascimento: {
    type: DataTypes.DATE,
    allowNull: false   
  }
});

module.exports = Paciente;
