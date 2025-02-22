// 30ps. Mo. todos fixtures

/// <reference types="cypress" />

it('Fixtures works', () => {
    // / fixtures/users.json
    cy.fixture('users').as('usersJson').then((users)=> {
        cy.log(users)
    });

    cy.fixture('example').as('exampleJson').then((example) => {
        cy.log(example)
    }); //fixtures/example.json
    cy.fixture('products').as('productsCsv').then((products) => {
        cy.log(products)
    });
});


// Jeigu mes turime duomenų generavimo kodą, jį paleidžiam vieną kartą ir UŽKOMENTUOJAM, kitaip duomenys nenustos kurtis
it('Duomenu generavimas', () => {
    let tasks = [];
    for(let i = 1; i<=100; i++) {
        tasks.push(i + " uzduotis");
    }
    console.log(tasks);
    cy.writeFile("cypress/fixtures/todos.json", { "todos": tasks});
});

it('100 todos suvedimas i ToDoJames svetaine',() => {
    cy.session("fixture_sesija", () => {
        cy.visit('https://todolist.james.am/#/');
        cy.fixture('todos.json').as('Todos').then((todosFile) => {
            cy.log(todosFile);
            cy.log(todosFile.todos[54]);
    
            // 1 būdas: for(let i=0; i < todosFile.todos.length - 1; i++) {cy.get('input.new-todo').type( todosFile.todos[i] +'{enter}');}

            // 2 būdas:
            todosFile.todos.forEach((todo) => {
                cy.get('input.new-todo').type( todo +'{enter}');
            });
            cy.get('ul.todo-list li').should('have.length', todosFile.todos.length );
        });
    });

    cy.visit('https://todolist.james.am/#/'); 
    cy.get('ul.todo-list li').should('have.length', 100);
});

// 30ps. Mo. todos fixtures
