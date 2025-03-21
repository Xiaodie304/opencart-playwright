import { expect } from "@playwright/test";
class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailField = page.getByRole("textbox", { name: "E-Mail Address" });
    this.passwordField = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.warningMessage = page.getByText("Warning: No match for E-Mail");
    this.forgottenPasswordLink = this.page
      .locator("#form-login")
      .getByRole("link", {
        name: "Forgotten Password",
      });
    this.headingLogin = page
      .getByRole("listitem")
      .filter({ hasText: /^Login$/ });
    this.forgottenPasswordLink = page
      .locator("#form-login")
      .getByRole("link", { name: "Forgotten Password" });
    this.rightColumnForgottenPasswordLink = page
      .locator("#column-right")
      .getByRole("link", { name: "Forgotten Password" });
    this.inputEmail = page.getByRole("textbox", { name: "E-Mail Address" });
  }

  async login() {
    await expect(this.page).toHaveURL(/en-gb\?route=account\/login/);
    await this.emailField.fill(process.env.TEST_USERNAME);
    await this.passwordField.fill(process.env.TEST_PASSWORD);
    await this.loginButton.click();
  }
  async loginWithInvalidUsernameAndPassword() {
    await this.emailField.fill("example@gmail.com");
    await this.passwordField.fill("password");
    await this.loginButton.click();
  }
  async expectInvalidLogin() {
    await expect(this.warningMessage).toBeVisible();
  }
  async loginWithInvalidPasword() {
    await this.emailField.fill(process.env.TEST_USERNAME);
    await this.passwordField.fill("password");
    await this.loginButton.click();
  }
  async loginWithInvalidMail() {
    await this.emailField.fill("example@gmail.com");
    await this.passwordField.fill(process.env.TEST_PASSWORD);
    await this.loginButton.click();
  }
  async loginWithoutCredentials() {
    await this.loginButton.click();
  }
  async expectLoginPage() {
    await expect(this.headingLogin).toBeVisible();
  }
  async clickForgottenPassword() {
    await expect(this.forgottenPasswordLink).toBeVisible();
    await this.forgottenPasswordLink.click();
  }
  async clickForgottenPasswordFromRightColumn() {
    await expect(this.rightColumnForgottenPasswordLink).toBeVisible();
    await this.rightColumnForgottenPasswordLink.click();
  }
  async inputEmailField(fillmail) {
    await this.inputEmail.fill(fillmail);
  }
}

export default LoginPage;
