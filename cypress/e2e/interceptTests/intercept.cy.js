// 29ps. Mo. intercept

/// <reference types="cypress" />

it('Request, intercept, visit', () => {
    cy.request("GET", "https://jsonplaceholder.typicode.com/posts/1").then((response) => {
    });

    cy.visit('https://todolist.james.am/#/')
    cy.intercept("GET", "https://jsonplaceholder.typicode.com/posts/104"); //sita nuoroda man grazina 404/ post kurio id=104
    // mes galime pasidaryti savo respone kokiai nors nuorodai(url) suteikiam savo/iškarto numatytą atsakymą - mock arba stub
});

it('Get a post/mock a post', () => {
    cy.intercept('GET', "https://media.ethicalads.io/media/client/ethicalads.min.js", {
        statusCode: 201,
        body: { userId: 104, title: 'perimtas pavadinimas', id: 104 }
    }).as('getPostMock');

    cy.visit("https://jsonplaceholder.typicode.com");
    cy.get('#run-button').click();
    cy.wait('@getPostMock');
});

// 29ps. Mo. intercept