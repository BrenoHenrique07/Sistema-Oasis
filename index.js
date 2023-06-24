const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const usuarios = require('./src/routes/usuarioRoutes');
app.use('/', usuarios);

// const authMiddleware = require('./src/middlewares/auth');
// app.use(authMiddleware.eAdmin);

const pacientes = require('./src/routes/pacientesRoutes');
app.use('/pacientes', pacientes);

const responsaveis = require('./src/routes/responsaveisRoutes');
app.use('/responsaveis', responsaveis);

const frequencias = require('./src/routes/frequenciaRoutes');
app.use('/frequencias', frequencias);

const doencas = require('./src/routes/doencasRoutes');
app.use('/doencas', doencas);

const historico = require('./src/routes/historicoRoutes');
app.use('/historico', historico);

app.listen(3000, ()=>{
    console.log('Server is running');
});
