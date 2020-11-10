describe("My First Test", () => {
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
    cy.server();
    cy.route({
      method: "POST",
      url: "/login",
      response: "fixture:loggedIn.json",
    }).as("login");
    localStorage.removeItem("persist:root");
    cy.clearCookies();

    // destructuring assignment of the this.currentUser object
    cy.visit("localhost:3000/auth");
    cy.clearCookies();
    // enter email
    cy.get("#basic_id").type("test1@safehub.com");
    // enter password and submit
    cy.get("[data-cy=password-enter]").type(`${"password"}{enter}`);

    cy.wait("@login");
    // our auth cookie should be present
    cy.getCookie("token").should("exist");
  });

  it("User can login and see some messages", () => {
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

    // we should be redirected to /dashboard
    cy.url().should("include", "/dashboard");
  });
});
