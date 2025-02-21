// namų darbai. cypress - todo.
// VS Code: cypress/npm + DBeaver.

// https://docs.cypress.io/app/get-started/why-cypress

// API su 10 endpoint
//  GET /products - atvaizduoti visus produktus. 
// 1. Kreiptis /products GET
// 2. patikrinti ar yra tinkamas response. Status kodo patikra. 200
// 3. Reikia response laika
// 4. Patikrinti ar ne tuscias ir patikrinti ar tai nera error zinute
// Papildomai: parašyti CYPRESS testą, kuris patikrina, ar produktas buvo sukurtas, kai kreipiamasį į POST /products.


describe('CRUD_API', () => {
    context('/products', () => {
        context('/products atskiri testai', () => {
            it('/products status kodas 200', () => {
                cy.request("GET", "localhost:3000/products").then((response) => {
                    expect(response.status).to.be.eq(200);
                });
            });

            it('/products atsakymo laikas', () => {
                cy.request("GET", "localhost:3000/products").then((response) => {
                    expect(response.duration).to.be.lessThan(1000);
                });
            });

            it('/products netuščias', () => {
                cy.request("GET", "localhost:3000/products").then((response) => {
                    expect(response.body).length.to.be.greaterThan(1);
                });
            });
        });

        it('/products endpoint bendras testas', () => {
            cy.request("GET", "localhost:3000/products").then((response) => {
                expect(response.status).to.be.eq(200);
                expect(response.duration).to.be.lessThan(1000);//1sec
                expect(response.duration).to.not.be.greaterThan(1000);
                expect(response.duration).to.be.below(1000);
                expect(response.body).length.to.be.above(1);
            });
        });

        it('/products vieno produkto bendras testas', () => {
            cy.request("GET", "localhost:3000/products/2").then((response) => {
                expect(response.status).to.be.eq(200);
                expect(response.body).to.have.property('id', 2);
                expect(response.body).to.have.property('title', 'Pizza');
                cy.log(response.body.id);
                cy.log(response.body.title);
                cy.log(response.body);
            });

            cy.log('pasiruosiau testui')
        });
    });
});

it('Tikrina, ar produktas buvo sukurtas, kai kreipiamasį į POST /products', () => {
    cy.request('POST', 'http://localhost:3000/products', {
        title: "Water",
        description: "Sparkling with lemon",
        price: 0.99
    }).then((response) => {
        expect(response.status).to.be.eq(201);
        expect(response.body).to.have.property("title", "Water");
        expect(response.body).to.have.property("description", "Sparkling with lemon");
        expect(response.body).to.have.property("price", 0.99);
        expect(response.body).to.have.property('id');
    })
});

it('Produktas atnaujinamas kai kreipiamasi į PUT/products/63', () => {
    cy.request('PUT', 'http://localhost:3000/products/63', {
        "title": "Table",
        "description": "White",
        "price": 899.99
    }).then((response) => {
        expect(response.status).to.be.eq(200);
        expect(response.body).to.have.property('title', 'Table')
        expect(response.body).to.have.property('description', 'White')
        expect(response.body).to.have.property('price', 899.99);
        expect(response.body).to.have.property('id');
        cy.log(response.body);
    })
});
// visuose rezultatuose turi matytis 200 ir žinutė, kad sėkmingai/nesėkmingai pavyko. 
// jei kodo atsakymas raudonuoja - programuotojas turės taisyti klaidą, ne testuotojas.

// produktą ištrina iš DBeaver
it('Produktas ištrinamas kai kreipiamasi į DELETE/products/9', () => {
    cy.request('DELETE', 'http://localhost:3000/products/9').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('message')
        cy.log(response.body);
    });
});