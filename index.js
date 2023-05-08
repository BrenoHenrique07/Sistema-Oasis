
const express = require('express');
const app = express();

const db = require('./src/db/connect');
db.openConnection();

app.listen(3000, ()=>{
    console.log('Server is running');
});