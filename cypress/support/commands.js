// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('clearInitialData', (key) => {
    return cy.window().then((win) => {
        win.localStorage.removeItem(key);
        cy.reload();
    });
});

Cypress.Commands.add('setInitialData', (key, value) => {
    const initialDataMap = typeof key === 'string' ? { [key]: value } : key;

    return cy.window().then((win) => {
        for (const [key, value] of Object.entries(initialDataMap)) {
            win.localStorage.setItem(key, JSON.stringify(value));
        }
        cy.reload();
    });
});
