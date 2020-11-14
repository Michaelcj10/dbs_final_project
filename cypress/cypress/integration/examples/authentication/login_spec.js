describe("Login", () => {
  it("User can do page interactions as expected", () => {
    cy.visit("localhost:3000/auth");

    // submit button is present
    cy.get(".ant-form-item-control-input-content > .ant-btn");

    // title and link for login are present
    cy.get("h1.ant-typography").contains("Welcome back");
    cy.get("#basic > .sc-AxheI > span").contains(
      "New to the site? Register now"
    );

    // click the submit with an empty form
    cy.get(".ant-form-item-control-input-content > .ant-btn").click();

    // expect to see error messages
    cy.get(
      ":nth-child(1) > .ant-form-item-control > .ant-form-item-explain > div"
    );

    // click the link to switch to register
    cy.get("#basic > .sc-AxheI > span").click();

    // title and link for register are present
    cy.get("h1.ant-typography").contains("Register now");
    cy.get("#basic > .sc-AxheI > span").contains("Have an account? Login now");
  });

  it("User auth token set on login", function () {
    cy.login();
    // our auth cookie should be present
    cy.getCookie("token").should("exist");
  });

  it("User can login and see some messages", () => {
    cy.login();
    // we should be redirected to /dashboard
    cy.url().should("include", "/dashboard");
  });
});
