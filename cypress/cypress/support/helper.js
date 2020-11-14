function loggedin() {
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

  cy.visit("localhost:3000/auth");

  // enter email
  cy.get("#basic_id").type("test1@safehub.com");
  // enter password and submit
  cy.get("[data-cy=password-enter]").type(`${"password"}{enter}`);

  // wait on the api requests we have mocked to be requested
  cy.wait("@login");
  cy.wait("@me");
  cy.wait("@messages");
}
