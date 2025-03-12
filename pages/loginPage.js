class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailField = page.getByRole("textbox", { name: "E-Mail Address" });
    this.passwordField = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.affiliateHeading = page.getByRole("heading", {
      name: "My Affiliate Account",
    });
  }

  async login() {
    await this.emailField.fill(process.env.USERNAME);
    await this.passwordField.fill(process.env.PASSWORD);
    await this.loginButton.click();
    await this.affiliateHeading.isVisible();
  }
}
module.exports = LoginPage;
