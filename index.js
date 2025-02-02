console.log('test');

//express - ekspreso serveris
//pg - integracia su PSql duombaze
//dotenv - prisijungimo duomenu pasidejimui duombazėje

const express = require('express'); // require pasiima is modules express
const app = express();

//prisijungia prei duombazes

app.use(express.json());//requestam ir responsam

//apsirasyti ROUTES - kelias
// GET      /products - route -> grazina visus produktus
// GET      /products - route|kelias -> grazina 1 produkta
// POST      /products/create -route|kelias -> sukuria viena aprodukta
// PUT/PATCH      /products/update/:id - route -> redaguoja produkta
// DELETE      /products/delete/:id -> istrina produkta

 //req - request, res - response
 // localhost:3000/products
 // { message: 'Sekmingai pasiektas produktu puslapis'} status kodas 200
app.get('/products', async (req, res) => {
    //neapibrezta klaida 400 koda, jeigu nepavyksta prisijungti prie duombazes 500
    try {
        res.status(200).json({ message: 'Sekmingai pasiektas produktu puslapis'});
    }
    catch (err){
        res.status(400).json({error: 'error'});        
    }
});



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Sereris runnina ${PORT}`)
});