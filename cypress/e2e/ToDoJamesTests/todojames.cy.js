// atidaryti svetainę: cy.visit();

it('Sukuriamas naujas to do', () => {
    cy.visit('https://todolist.james.am/#/');

    // 1. Priversti robota(cypress) suvesti uzuodties pavadinima
    //. 1.1. turim patikrinti ar input egzistuoja


    cy.get('input.new-todo').type('1 uzduotis. tekstas isiveda automatiskai kai ji irasom i vs code{enter}');

    // 2. Patikrinti ar pirma uzduotis atsidure uzduociu sarase




});