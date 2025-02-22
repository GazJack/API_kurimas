// 27ps.Mo. before each

/// <reference types="cypress" />

it('Delete new to do', () => {
    cy.visit('https://todolist.james.am/#/');
    cy.get('input.new-todo').type('1 uzduotis{enter}');
    cy.get('input.new-todo').type('trinama uzduotis{enter}');

    // sudetingesnis variantas
    cy.contains('ul.todo-list li', 'trinama uzduotis').find('button.destroy').invoke('show');
    cy.contains('ul.todo-list li', 'trinama uzduotis').find('button.destroy').click();

    //paprastesnis variantas
    // cy.contains('ul.todo-list li', 'trinama uzduotis').find('button').click({force: true});
    //mouseover - uzvedus pelyte kazkas atsitinka
    //mosuedown - paspaudus pelytes klavisa
    //mouseup - atleidus pelytes klavisa
    //...

    cy.contains('ul.todo-list li', 'trinama uzduotis').should('not.exist');
});

it('To do item edit', () => {
    cy.visit('https://todolist.james.am/#/');
    cy.get('input.new-todo').type('1 uzduotis{enter}');
    cy.get('input.new-todo').type('2 uzduotis{enter}');
    cy.get('input.new-todo').type('3 uzduotis{enter}');
});

describe('TodoJamesTestaiKuriemsNereikiaBeforeEachSesijos', () => {
    beforeEach(() => {
        cy.visit('https://todolist.james.am/#/');
    });

    it('Create new to do', () => {
        cy.get('input.new-todo').type('1 uzduotis{enter}');
        cy.contains('ul.todo-list li', '1 uzduotis').should('be.visible')
    });

    it('Ar <header> elementas atvaizduojamas', () => {
        cy.get('header').should('exist');
        cy.get('header').should('be.visible');
    });

    it('Ar headeryje(h1 tage) atvaizduojamas tekstas "To Do List"', () => {
        cy.get('header h1').should('exist');
        cy.get('header h1').should('be.visible');

        cy.contains('header h1', 'To Do List').should('be.visible');
        cy.get('header h1').should('have.text', 'To Do List');
    });

    it("Ar atvaizduojamas 'Double-click to edit a todo' tekstas", () => {
        cy.contains('footer.info p', 'Double-click to edit a toodo').should('exist');
        cy.contains('footer.info p', 'Double-click to edit a toodo').should('be.visible');
    });

    it("Ar input laukelyje atvaizduojamas tekstas 'What need's to be done?'", () => {
        cy.get('input.new-todo[placeholder="What need\'s to be done?"]').should('exist');
        cy.get('input.new-todo[placeholder="What need\'s to be done?"]').should('be.visible');
        cy.get('input.new-todo')
            .should('have.attr', 'placeholder', "What need's to be done?")
            .should('be.visible');
    });
});

// 27ps.Mo. before each
