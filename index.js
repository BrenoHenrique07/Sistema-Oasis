
const express = require('express');
const app = express();

const teste = require('./src/paciente/model');
const teste2 = require('./src/frequencia/model');
const teste3 = require('./src/responsavel/model');

const db = require('./src/db/connect');
db.openConnection();
db.syncDataBase();

app.listen(3000, ()=>{
    console.log('Server is running');
});