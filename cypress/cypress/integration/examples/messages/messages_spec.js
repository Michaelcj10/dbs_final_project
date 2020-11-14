describe("Messages", () => {
  it("User can add a message", () => {
    cy.server();
    cy.route({
      method: "POST",
      url: "/messages",
      response: "fixture:message.json",
    }).as("message");
    localStorage.removeItem("persist:root");
    cy.clearCookies();

    cy.login();
    cy.get("[data-cy=add-msg]").click();
    cy.get("[data-cy=add-title]").type("Some title");
    cy.get("[data-cy=add-comment]").type("Some comment");
    cy.get("[data-cy=submit-msg]").click();

    cy.wait("@message");
    cy.get(".ant-message-notice-content").should("have.text", "Message posted");
    cy.get("[data-cy=add-title]").should("have.value", "");
    cy.get("[data-cy=add-comment]").should("have.value", "");
  });
});
