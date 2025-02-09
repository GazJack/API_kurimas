// https://docs.cypress.io/app/get-started/why-cypress

const cypress = require("cypress");

it('Kreipiamės į /products', () => {
    cypress.request("GET", "localhost:3000/products")
});

// Papildomai: parašyti CYPRESS testą, kuris patikrina, ar produktas buvo sukurtas, kai kreipiamasį į POST /products

// Tikslas: parašyti testą, kuris:

// Išsiunčia POST užklausą į /products su produkto duomenimis.
it('Tikrina, ar produktas buvo sukurtas, kai kreipiamasį į POST /products', () => {
    cypress.request('POST', 'http://localhost:3000/products', {     "title": "Water",
        "description": "Sparkling with lemon",
        "price": 0.99}).then((response) => {
        expect(response.body).to.have.property("title", "Water");
        expect(response.body).to.have.property( "description", "Sparkling with lemon");
        expect(response.body).to.have.property("price", 0.99);
    })
});

// Patikrina, ar atsakyme gaunamas teisingas statuso kodas.

//  Patikrina, ar atsakyme esantys duomenys atitinka tai, ką nusiuntei.

// npx cypress run


