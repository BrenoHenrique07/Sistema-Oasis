const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const pacientes = require('./routes/pacientesRoutes');
app.use('/pacientes', pacientes);

const responsaveis = require('./routes/responsaveisRouter');
app.use('/responsaveis', responsaveis);

// const frequencias = require('./src/frequencia/routes');
// app.use('/frequencias', frequencias);

// const doencas = require('./src/doencas/routes');
// app.use('/doencas', doencas);

app.listen(3000, ()=>{
    console.log('Server is running');
});
