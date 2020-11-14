describe("Profile", () => {
  it("User can view their profile", () => {
    cy.login();
    cy.route({
      method: "GET",
      url: "/notifications/*",
      response: "fixture:notifications.json",
    }).as("notifications");

    cy.visit("localhost:3000/profile");

    cy.wait("@notifications");

    cy.get(
      ":nth-child(1) > :nth-child(1) > .ant-descriptions-item-content"
    ).should("have.text", "Fairview Refuge");
    cy.get(
      ":nth-child(1) > :nth-child(2) > .ant-descriptions-item-content"
    ).should("have.text", "087 9386498");
    cy.get(".ant-row > .ant-typography").should(
      "have.text",
      "You have 0 beds available"
    );
  });
});
