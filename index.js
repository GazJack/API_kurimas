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

app.get('/products', async (req, res)); //req - request, res - response


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Sereris runnina ${PORT}`)
});