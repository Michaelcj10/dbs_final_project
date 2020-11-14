describe("Notifications", () => {
  it("User can view their notifications", () => {
    cy.login();

    cy.route({
      method: "GET",
      url: "/notifications/*",
      response: "fixture:notifications.json",
    }).as("notifications");

    cy.visit("localhost:3000/notifications");

    cy.wait("@notifications");

    cy.visit("localhost:3000/dashboard");

    cy.get(".ant-badge > .ant-avatar").click();

    cy.get(".ant-list-items > :nth-child(1)");
    cy.get(".ant-list-items > :nth-child(2)");
    cy.get(".ant-list-items > :nth-child(3)");
    cy.get(".ant-list-items > :nth-child(4)");
  });
});
