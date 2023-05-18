const { Sequelize, DataTypes } = require('sequelize');
const Paciente = require('../paciente/model');
const db = require('../db/connect');

const Frequencia = db.returnInstance().define('frequencias', {
  id_frequencia: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true  
  },
  data_hora: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false   
  }
}, {
  timestamps: false
});

Paciente.hasMany(Frequencia, { foreignKey: 'id_paciente', onDelete: 'RESTRICT' });
Frequencia.belongsTo(Paciente, { foreignKey: 'id_paciente' });

module.exports = Frequencia;
