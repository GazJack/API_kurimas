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
// app.get('/products', async (req, res) => {
//     //neapibrezta klaida 400 koda, jeigu nepavyksta prisijungti prie duombazes 500
//     try {
//         res.status(200).json({ message: 'Sėkmingai pasiekiamas produktų puslapis'});
//     }
//     catch (err) {
//         res.status(400).json({error: 'error'});
//     }
    
// });
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
    }
    
});

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
    }
    
});
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
    }
    
});
//  PUT/PATCH     /users/:id - route redaguos users
app.put('/users/:id', async (req, res) => {
    try {
        // insert into users (id,username,"password")  values (1000, 'idetasPerInsert','idetasPerInser')
        

        const id = req.params.id;
        const {username, password} = req.body;

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
    }
    
});
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
    }
    
});


// /users reikia gauti visų vartotojų sąrašą iš lentelės users
// 1. API turi prisijungti prie DB x
// 2. Kelia /users x
// 3. Per postman atvaizduoti users JSON formatu


// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on ${PORT}`)
// });

// dirbam su: postgresql, dbeaver, postman, vs code, cypress






// const express = require('express'); //require pasiima is modules express
// const app = express();

// //prisijungima prie duombazes 
// const pool = require('./database');

// app.use(express.json());//requestam ir responsem

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







// ____________________________________________________________________________
//                           PRODUCTS:
// ____________________________________________________________________________

// app.get('/products', async (req, res) => {
//     try {
//         const results = await pool.query('SELECT * FROM Products');
//         res.status(200).json(results.rows);
//     }
//     catch (err) {
//         res.status(400).json({ error: 'error' });
//     }
// });

// //  GET /products/:id - atvaizduoti konkretų produktą
// app.get('/products/:id', async (req, res) => {
//     try {
//         const { id } = req.params.id;
//         const results = await pool.query('SELECT * FROM Products WHERE id = $1', [id]);
//         res.status(200).json(results.rows[0]);
//     }
//     catch (err) {
//         res.status(400).json({ error: 'error' });
//     }
// });

app.get('/products', async (req, res) => {
    //neapibrezta klaida 400 koda, jeigu nepavyksta prisijungti prie duombazes 500
    try {
        const results = await pool.query("select * from products");
        res.status(200).json(results.rows);
    }
    catch (err) {
        res.status(400).json({ error: 'error' });
    }

});



// //  GET     /users - route mums grazins visus users
// app.get('/products:id', async (req, res) => {

//     try {
//         const results = await pool.query("select * from products");
//         res.status(200).json(results.rows);
//         // res.status(200).json({ message: 'Sėkmingai pasiekiamas produktų puslapis'});
//     }
//     catch (err) {
//         res.status(400).json({ error: 'error' });
//     }
// });

app.get('/products', async (req, res) => {
    try {
        const results = await pool.query("select * from products");
        res.status(200).json(results.rows);
    }
    catch (err) {
        res.status(400).json({ error: 'error' });
    }});

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
    



//  POST /products - sukurti naują produktą
app.post('/products', async (req, res) => {
    try {
        const { title, description, price } = req.body;
        const results = await pool.query(`INSERT INTO products (title,description,price) VALUES ('${title}', '${description}', ${price}) returning *`);
            res.status(201).json(results.rows[0]);
    }
    catch (err) {
    res.status(400).json({ error: 'error' });
}
});




//  PUT /products/:id - redaguoti produktą
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, price } = req.body;
    try {
        const results = await pool.query(
            `UPDATE Products SET title = '${title}, description = ${description}, price = ${price} WHERE id = $4 RETURNING *',
            [title, description, price, id]
        `);
        if (results.rows.length === 0) {
            return res.status(404).json({ message: 'error' });
        }
        res.status(200).json(results.rows[0]);
    }
    catch (err) {
        res.status(400).json({ error: 'error' });
    }
});



//  DELETE /products/:id - ištrinti produktą
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
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});