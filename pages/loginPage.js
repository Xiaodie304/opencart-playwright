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
    this.forgottenPasswordHeading = page.getByRole("heading", {
      name: "Forgot Your Password?",
    });
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
  async expectForgottenPassword() {
    await expect(this.forgottenPasswordLink).toBeVisible();
  }
  async clickForgottenPassword() {
    await this.forgottenPasswordLink.click();
    await expect(this.page).toHaveURL(/en-gb\?route=account\/forgotten/);
    await expect(this.forgottenPasswordHeading).toBeVisible();
  }
}

export default LoginPage;
