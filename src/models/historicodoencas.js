'use strict';
const {
  Model
} = require('sequelize');
const doencas = require('./doencas');
module.exports = (sequelize, DataTypes) => {
  class historicoDoencas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      historicoDoencas.hasMany(models.pacientes, {
        foreignKey: 'id',
        as: 'paciente',
      });
      historicoDoencas.hasMany(models.doencas, {
        foreignKey: 'id',
        as: 'doenca',
      });
    }
  }
  historicoDoencas.init({
    pacienteId: DataTypes.INTEGER,
    doencaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'historicoDoencas',
  });
  return historicoDoencas;
};