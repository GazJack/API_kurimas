const express = require('express');
const app = express();
const pool = require('./database');
app.use(express.json());

app.get('/users', async (req, res) => {    
    try {
        const results = await pool.query("select * from users");    
        res.status(200).json(results.rows);
    }
    catch (err) {
        res.status(400).json({error: 'error'});
    }});

app.get('/users/:id', async (req, res) => {    
    try {
        const id = req.params.id;
        const results = await pool.query(`select * from users where id=$1`,[id]);    
        res.status(200).json(results.rows[0]);
    }
    catch (err) {
        res.status(400).json({error: 'error'});
    }});

    app.post('/users', async (req, res) => {
    try {        
        const {id, username, password} = req.body;
        const results = await pool.query(`insert into users (id,username,"password")  values (${id}, '${username}','${password}') returning *`);    
        res.status(201).json(results.rows[0]);
    }
    catch (err) {
        res.status(400).json({error: 'error'});
    }});

    app.put('/users/:id', async (req, res) => {
    try {        
        const id = req.params.id;
        const {username, password} = req.body;
        const results = await pool.query(`update users 
            set username = '${username}', 
            "password" = '${password}' 
            where id = ${id} 
            returning *`);    
        res.status(200).json(results.rows[0]);
    }
    catch (err) {
        res.status(400).json({error: 'error'});
    }});

    app.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const results = await pool.query(`delete from users where id = ${id}`);    
        res.status(200).json({message: 'Elementas sėkmingai ištrintas'});
    }
    catch (err) {
        res.status(400).json({error: 'error'});
    }});

// ____________________________________________________________________________
//                           PRODUCTS:
// ____________________________________________________________________________

app.get('/products', async (req, res) => {
    try {
        const results = await pool.query("select * from products");
        res.status(200).json(results.rows);
    }
    catch (err) {
        res.status(400).json({ error: 'error' });
    }});

app.get('/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const results = await pool.query(`select * from products where id=$1`,[id]);
        res.status(200).json(results.rows[0]);
    }
    catch (err) {
        res.status(400).json({ error: 'error' });
    }});

app.post('/products', async (req, res) => {
    try {
        const { title, description, price } = req.body;
        const results = await pool.query(`INSERT INTO products (title,description,price) VALUES ('${title}', '${description}', ${price}) returning *`);
            res.status(201).json(results.rows[0]);
    }
    catch (err) {
    res.status(400).json({ error: 'error' });
}});

    app.put('/products/:id', async (req, res) => {
    try {  
        const id = req.params.id;
        const {title, description, price} = req.body;
        const results = await pool.query(`update products 
            set title = '${title}', 
            description = '${description}', 
            price = ${price} 
            where id = ${id}
            returning *`);    
        res.status(200).json(results.rows[0]);
    }
    catch (err) {
        res.status(400).json({error: 'error'});
    }});

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const results = await pool.query('DELETE FROM Products WHERE id = $1 RETURNING *', [id]);
        if (results.rows.length === 0) {
            return res.status(404).json({ message: 'Produktas nerastas' });
        }
        res.status(200).json({ message: 'Produktas sėkmingai ištrintas' });
    }
    catch (err) {
        res.status(400).json({ error: 'Nepavyko ištrinti produkto' });
    }});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

