// https://docs.cypress.io/app/get-started/why-cypress

// const cy = require('cypress');

// it('Kreipiamės į /products', () => {
//     cy.request("GET", "localhost:3000/products")
// });

// Papildomai: parašyti CYPRESS testą, kuris patikrina, ar produktas buvo sukurtas, kai kreipiamasį į POST /products


it('Tikrina, ar produktas buvo sukurtas, kai kreipiamasį į POST /products', () => {
    cy.request('POST', 'http://localhost:3000/products', {     "title": "Water", "description": "Sparkling with lemon", "price": 0.99}).then((response) => {
        expect(response.body).to.have.property("title", "Water");
        expect(response.body).to.have.property("description", "Sparkling with lemon");
        expect(response.body).to.have.property("price", 0.99);
    })
});




