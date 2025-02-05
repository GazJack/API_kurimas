// dirbam su: postgresql, dbeaver, postman, vs code, cypress

// console.log('test');

//express - ekspreso serveris
//pg - integracija su PSql duombaze
//dotenv - prisijungimo duomenu pasidejimui duombazei

const express = require('express'); //require pasiima is modules express
const app = express();

//prisijungima prie duombazes 
const pool = require('./database');

app.use(express.json());//requestam ir responsem

//Apsirasyti ROUTES - kelias
//  GET     /products - route mums grazins visus produktus
//  GET     /products/:id - route mums viena 1 produkta
//  POST         /products/create - route sukurs produkta
//  PUT/PATCH     /products/update/:id - route redaguos produkta
//  DELETE     /products/delete/:id  - istrins produkta

//req - request
//res - response
//localhost:3000/products
//{ message: 'Sėkmingai pasiekiamas produktų puslapis'} status kodas 200
app.get('/products', async (req, res) => {
    //neapibrezta klaida 400 koda, jeigu nepavyksta prisijungti prie duombazes 500
    try {
        res.status(200).json({ message: 'Sėkmingai pasiekiamas produktų puslapis'});
    }
    catch (err) {
        res.status(400).json({error: 'error'});
    }
    
});



//  GET     /users - route mums grazins visus users
app.get('/users', async (req, res) => {
    //neapibrezta klaida 400 koda, jeigu nepavyksta prisijungti prie duombazes 500
    //select * from users
    
    try {
        const results = await pool.query("select * from users");    
        res.status(200).json(results.rows);
        // res.status(200).json({ message: 'Sėkmingai pasiekiamas produktų puslapis'});
    }
    catch (err) {
        res.status(400).json({error: 'error'});
    }});



//  GET     /users/:id - route mums viena 1 users
app.get('/users/:id', async (req, res) => {
    //neapibrezta klaida 400 koda, jeigu nepavyksta prisijungti prie duombazes 500
    //select * from users
    
    try {
        const id = req.params.id;
        const results = await pool.query(`select * from users where id=$1`,[id]);    
        // const results = await pool.query(`select * from users where id=${id}`);    
        res.status(200).json(results.rows[0]);
        // res.status(200).json({ message: 'Sėkmingai pasiekiamas produktų puslapis'});
    }
    catch (err) {
        res.status(400).json({error: 'error'});
    }});



//  POST         /users - route sukurs users
app.post('/users', async (req, res) => {
    try {
        // insert into users (id,username,"password")  values (1000, 'idetasPerInsert','idetasPerInser')
        const {id, username, password} = req.body;

        const results = await pool.query(`insert into users (id,username,"password")  values (${id}, '${username}','${password}') returning *`);    
        // const results = await pool.query(`select * from users where id=${id}`);    
        res.status(201).json(results.rows[0]);
        // res.status(200).json({ message: 'Sėkmingai pasiekiamas produktų puslapis'});
    }
    catch (err) {
        res.status(400).json({error: 'error'});
    }});



//  PUT/PATCH     /users/:id - route redaguos users
app.put('/users/:id', async (req, res) => {
    try {
        // insert into users (id,username,"password")  values (1000, 'idetasPerInsert','idetasPerInser')
        const id = req.params.id;
        const {username, password} = req.body;
        //arba galim rašyti (tada į postman body nereikės įrašyti kuriamo id, nes jis jį pasiims pats iš to kokį nurodysim prie postman nuorodos):
        //const id = req.params.id;
        //const {username, passwords} = req.body;

        const results = await pool.query(`update users 
            set username = '${username}', 
            "password" = '${password}' 
            where id = ${id} 
            returning *`);    
        // const results = await pool.query(`select * from users where id=${id}`);    
        res.status(200).json(results.rows[0]);
        // res.status(200).json({ message: 'Sėkmingai pasiekiamas produktų puslapis'});
    }
    catch (err) {
        res.status(400).json({error: 'error'});
    }});


//  DELETE     /users/:id  - istrins users
app.delete('/users/:id', async (req, res) => {
    try {
        // insert into users (id,username,"password")  values (1000, 'idetasPerInsert','idetasPerInser')
        const id = req.params.id;

        const results = await pool.query(`delete from users where id = ${id}`);    
        // const results = await pool.query(`select * from users where id=${id}`);    
        res.status(200).json({message: 'Elementas sėkmingai ištrintas'});
        // res.status(200).json({ message: 'Sėkmingai pasiekiamas produktų puslapis'});
    }
    catch (err) {
        res.status(400).json({error: 'error'});
    }});


// /users reikia gauti visų vartotojų sąrašą iš lentelės users
// 1. API turi prisijungti prie DB x
// 2. Kelia /users x
// 3. Per postman atvaizduoti users JSON formatu


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});

// dirbam su: postgresql, dbeaver, postman, vs code, cypress
