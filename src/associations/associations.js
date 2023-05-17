function associations() {
    const Paciente = require('../paciente/model');
    const Responsavel = require('../responsavel/model');
    const Frequencia = require('../frequencia/model');

    Paciente.hasMany(Responsavel, { foreignKey: 'id_paciente' });
    Responsavel.belongsTo(Paciente, { foreignKey: 'id_paciente' });

    Paciente.hasMany(Frequencia, { foreignKey: 'id_paciente_fq' })
    Frequencia.belongsTo(Paciente, { foreignKey: 'id_paciente_fq' });
};

module.exports = {
    associations
};