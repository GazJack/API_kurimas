// https://docs.cypress.io/app/get-started/why-cypress

// const cy = require('cypress');

// it('Kreipiamės į /products', () => {
//     cy.request("GET", "localhost:3000/products")
// });





// DĖSTYTOJO:
// API su 10 endpoint
//  GET /products - atvaizduoti visus produktus. 
    // 1. Kreiptis /products GET
    // 2. patikrinti ar yra tinkamas response. Status kodo patikra. 200
    // 3. Reikia response laika
    // 4. Patikrinti ar ne tuscias ir patikrinti ar tai nera error zinute

// const { response } = require("express");

describe('CRUD_API', () => {
    context('/products', () => {  
        context('/products atskiri testai', () => {
            it('/products status kodas 200', ()=> {
                cy.request("GET", "localhost:3000/products").then((response) => {
                    expect(response.status).to.be.eq(200);
                });
            });
            it('/products atsakymo laikas', ()=> {
                cy.request("GET", "localhost:3000/products").then((response) => {
                    expect(response.duration).to.be.lessThan(1000);
                });
            });
            it('/products netuscias', ()=> {
                cy.request("GET", "localhost:3000/products").then((response) => {
                    expect(response.body).length.to.be.greaterThan(1);
                });
            });          
        });  
    });  
        
        it('/products endpoint bendras testas', () => {
        cy.request("GET", "localhost:3000/products").then((response) => {
            //patikrinti status koda
            expect(response.status).to.be.eq(200);
            //response
            expect(response.duration).to.be.lessThan(1000);//1sec
            expect(response.duration).to.not.be.greaterThan(1000);
            expect(response.duration).to.be.below(1000);
    
            //patikrinti response.body
            expect(response.body).length.to.be.above(1);
            //Statusas 200 ir gaunam produktus
            //{0,1,2 ...}
            //400 error
            //{ error: 'kazkas negerai' }
            
            console.log('test');
            cy.log('test');
            console.log('pakeitimas')
    
            //response.body turi elementa products 
            // error elemento tikrinimas
    
            console.log(response.body);
            cy.log(response.body);
            //visi produktai response.body
            // expect()
        });
    
    });
    
    
    it('/products vieno produkto bendras testas', () => {
        cy.request("GET","localhost:3000/products/5" ).then((response)=>{
            expect(response.status).to.be.eq(200);
            // expect(response.body).length.to.be.above(0); //ilgis daugiau nei 0
            expect(response.body).to.have.property('id', 5); //error - sita vieta nepraeis
            expect(response.body).to.have.property('title', 'Dog food');
            // expect(response.body).to.have.property('title');
            
            // expect()
            // id == 2 arba title == "Antra prekė" nebutu tuscias
            cy.log(response.body.id);
            cy.log(response.body.title);
            // expect(response.body).length.to.be.greaterThan(0);
            cy.log(response.body);
        });
    
        cy.log('pasiruosiau testui')
    });

    // it('/products create bendras testas', () => {
    //     cy.request("POST", "localhost:3000", {
    //         title: "naujaPrekė",
    //         description: "naujasAprasymas",
    //         price: 4.99
    //     }).then((response)=> {
    
    //     });

    // MANO:
// Papildomai: parašyti CYPRESS testą, kuris patikrina, ar produktas buvo sukurtas, kai kreipiamasį į POST /products
it('Tikrina, ar produktas buvo sukurtas, kai kreipiamasį į POST /products', () => {
    cy.request('POST', 'http://localhost:3000/products', {     "title": "Water", "description": "Sparkling with lemon", "price": 0.99}).then((response) => {
        expect(response.body).to.have.property("title", "Water");
        expect(response.body).to.have.property("description", "Sparkling with lemon");
        expect(response.body).to.have.property("price", 0.99);
    })
});

// update
it('Produktas atnaujinamas kai kreipiamasi į PUT/products/7', () => {
    cy.request('PUT', 'http://localhost:3000/products/7', {"title": "Table", "description": "White", "price": 899.99}).then((response) => {
        expect(response.body).to.have.property('title', 'Table')
        expect(response.body).to.have.property('description', 'White')
        expect(response.body).to.have.property('price', 899.99)
    })
});


// delete
it('Produktas ištrinamas kai kreipiamasi į DELETE/products/18', () => {
    cy.request('DELETE', 'http://localhost:3000/products/18').then((response) => {
        expect(response.status).to.eq(200);
    });
  });
});
