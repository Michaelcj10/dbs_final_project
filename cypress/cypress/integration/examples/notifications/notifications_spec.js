describe("Notifications", () => {
  it("User can view their notifications", () => {
    cy.login();

    cy.route({
      method: "GET",
      url: "/notifications/*",
      response: "fixture:notifications.json",
    }).as("notifications");

    cy.wait("@notifications");

    cy.visit("localhost:3000/notifications");
  });
});
