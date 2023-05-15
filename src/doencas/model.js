const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db/connect');

const Doencas = db.returnInstance().define('doencas', {
  id_doenca: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true  
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
    timestamps: false
});

module.exports = Doencas;
