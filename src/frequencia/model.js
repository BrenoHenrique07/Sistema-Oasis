const { Sequelize, DataTypes } = require('sequelize');
const pacientes = require('../paciente/model');
const db = require('../db/connect');

const Frequencia = db.returnInstance().define('frequencia', {
  id_frequencia: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true  
  },
  id_paciente: {
    type: DataTypes.BIGINT,
    allowNull: false  
  },
  data_hora: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false   
  }
}, {
  timestamps: false
});

Frequencia.belongsTo(pacientes, { foreignKey: 'id_paciente' });

module.exports = Frequencia;
