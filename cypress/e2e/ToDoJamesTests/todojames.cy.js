// atidaryti svetainę: cy.visit();

it('Sukuriamas naujas to do', () => {
    cy.visit('https://todolist.james.am/#/');

    // 1. Priversti robota(cypress) suvesti uzuodties pavadinima
    //. 1.1. turim patikrinti ar input egzistuoja


    cy.get('input.new-todo').type('1 uzduotis. tekstas isiveda automatiskai kai ji irasom i vs code{enter}');

    // 2. Patikrinti ar pirma uzduotis atsidure uzduociu sarase

});



    //1.2 turim ivesti konkretu teksta i input
    
    
    //document.querySelector("p");
    //document.querySelector("#id");
    //document.querySelector(".class");

    // document.querySelector("p.header")
    // document.querySelector("h1#header")
    
    //document.getElementById('id')
    //document.getElementByClass('class') !!!!!!!!!!
    // 1 uzduotis arba bus null
    cy.contains('ul.todo-list li', '1 uzduotis').should('be.visible')
    // cy.get('ul.todo-list li')
    //ar 1 uzduotis li elementas yra matomas
    // cy.get('ul.todo-list li')
    //cypress bando ieskoti elemento li, kurio turinys yra 1 uzduotis
    

    // cy.get('ul.todo-list li').invoke('text').should('c')
    // Patikrinti ar pirma uzduotis atsidure uzduociu sarase


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

    //ne tik paslepia elementa bet ir istrina jo koda

    // cy.contains('ul.todo-list li', 'trinama uzduotis').should('not.be.visible')
    cy.contains('ul.todo-list li', 'trinama uzduotis').should('not.exist');

    //sita veiksma atliksim po pertraukos
    


    //susikurti uzduoti x
    //sukurta uzduoti istrinti

})

it('To do item edit', () => {
    cy.visit('https://todolist.james.am/#/');
    cy.get('input.new-todo').type('1 uzduotis{enter}');
    cy.get('input.new-todo').type('2 uzduotis{enter}');
    cy.get('input.new-todo').type('3 uzduotis{enter}');

    // 2 uzduoti redaguosim
    cy.contains('ul.todo-list li', '2 uzduotis').dblclick();

    //uzduoties laukeli isvalysim ir tada pridesim teksta "redaguota uzduotis"
    cy.contains('ul.todo-list li', '2 uzduotis').find('input.edit').clear().type('redaguota uzduotis{enter}')


    cy.contains('ul.todo-list li', 'redaguota uzduotis').should('be.visible');

    // cy.get('.edit').clear();

})