'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class doencas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      doencas.belongsTo(models.historicoDoencas, {
        foreignKey: "id",
        as: 'historico',
      });
    }
  }
  doencas.init({
    nome: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'doencas',
  });
  return doencas;
};