//failas atsakingas už prisijungimą prie duomenų bazės
//dokumentacija:
//https://node-postgres.com/features/pooling 

//imk duomenis iš .env failo
require('dotenv').config();

const  { Pool } = require('pg'); //npm i pg /atsakingas u= prisijungima

const pool = new Pool ({
    user : process.env.PG_USER, //postgres
    host : process.env.PG_HOST, //localhost
    database: process.env.PG_DATABASE, //postgres
    password: process.env.PG_PASSWORD, //root
    port: process.env.PG_PORT //5432
});

pool.on('error', (err,client) => {
    console.error('Something is wrong', err);
    process.exit(-1);    
});

//mes visa faila galim naudoti kaip moduli
module.exports = pool;