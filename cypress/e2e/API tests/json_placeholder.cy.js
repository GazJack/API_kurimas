// https://jsonplaceholder.typicode.com/posts/104

it('getPost testas jsonplaceholder.typicode.com', () => {

    cy.request("GET","https://jsonplaceholder.typicode.com/posts/14" ).then((response)=>{
        expect(response.status).to.be.eq(200);
        // expect(response.body).length.to.be.above(0); //ilgis daugiau nei 0
        expect(response.body).to.have.property('userId'); //error - sita vieta nepraeis
        expect(response.body).to.have.property('title');
        expect(response.body).to.have.property('body');
        expect(response.body).to.have.property('id');
        cy.log(response.body)
    });


});