const express = require('express');
const app = express();

require('./src/responsavel/model');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));



app.listen(3000, ()=>{
    console.log('Server is running');
});
