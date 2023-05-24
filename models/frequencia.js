'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class frequencia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      frequencia.hasMany(models.pacientes, {
        foreignKey: 'id',
        as: 'paciente',
      });
    }
  }
  frequencia.init({
    pacienteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'frequencia',
  });
  return frequencia;
};