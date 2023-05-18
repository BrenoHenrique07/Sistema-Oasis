const {Sequelize} = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize(`postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@localhost:5432/postgres`); 

function returnInstance(){
    return sequelize;
}

function openConnection() {
    try{
        sequelize.authenticate();
        console.log('Connection has been established');
    } catch (err) {
        console.log('Connnection error: ', err);
    }
}

function closeConnection() {
    try{
        sequelize.close();
        console.log('Connection was closed');
    } catch (err) {
        console.log('Closed connnection error: ', err);
    }
}

async function syncDataBase() {
   sequelize.sync({alter : true});
}

module.exports = {
    syncDataBase,
    openConnection,
    closeConnection,
    returnInstance
};