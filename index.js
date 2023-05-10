
const express = require('express');
const app = express();

require('./src/responsavel/model');

const pacientes = require('./src/paciente/routes');
app.use('/pacientes', pacientes);

const frequencias = require('./src/frequencia/routes');
app.use('/frequencias', frequencias);

const responsaveis = require('./src/responsavel/routes');
app.use('/responsaveis', responsaveis);

const db = require('./src/db/connect');
db.openConnection();
db.syncDataBase();

app.listen(3000, ()=>{
    console.log('Server is running');
});
