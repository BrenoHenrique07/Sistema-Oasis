'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pacientes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      pacientes.belongsTo(models.responsaveis, {
        foreignKey: "id",
        as: 'responsavel',
      });
    }
  }
  pacientes.init({
    nome: DataTypes.STRING,
    sobrenome: DataTypes.STRING,
    cpf: DataTypes.STRING,
    endereco: DataTypes.STRING,
    data_nascimento: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'pacientes',
  });
  return pacientes;
};