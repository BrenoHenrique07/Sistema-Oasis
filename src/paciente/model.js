const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db/connect');
const responsaveis = require('../responsavel/model');

const Paciente = db.returnInstance().define('paciente', {
  id_paciente: {
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
  data_nascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false   
  }
}, {
    timestamps: false
});

Paciente.hasMany(responsaveis, { foreignKey: 'id_paciente' });

module.exports = Paciente;
