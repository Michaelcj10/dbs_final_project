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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.on("window:before:load", (win) => {
  win.fetch = null;
});

Cypress.Commands.add("login", () => {
  cy.server();
  cy.route({
    method: "POST",
    url: "/login",
    response: "fixture:loggedIn.json",
  }).as("login");
  localStorage.removeItem("persist:root");
  cy.clearCookies();

  // set server stubs to mock api response
  cy.server();
  cy.route({
    method: "GET",
    url: "/me",
    response: "fixture:me.json",
  }).as("me");
  cy.route({
    method: "GET",
    url: "/messages",
    response: "fixture:messages.json",
  }).as("messages");
  cy.route({
    method: "GET",
    url: "/organisations/*",
    response: "fixture:organisations.json",
  }).as("organisations");
  cy.visit("localhost:3000/auth");

  // enter email
  cy.get("#basic_id").type("test1@safehub.com");
  // enter password and submit
  cy.get("[data-cy=password-enter]").type(`${"password"}{enter}`);

  // wait on the api requests we have mocked to be requested
  cy.wait("@login");
  cy.wait("@me");
  cy.wait("@messages");
  cy.wait("@organisations");
});
