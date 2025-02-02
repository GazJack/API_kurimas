console.log('test');

//express - ekspreso serveris
//pg - integracia su PSql duombaze
//dotenv - prisijungimo duomenu pasidejimui duombazėje

const express = require('express'); // require pasiima is modules express
const app = express();

//prisijungia prei duombazes

app.use(express.json());//requestam ir responsam