import { expect } from "@playwright/test";
class ForgottenPassword {
  constructor(page) {
    this.page = page;
    this.forgottenPasswordHeading = page
      .getByRole("listitem")
      .filter({ hasText: "Forgotten Password" })
      .getByRole("link");
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.sussessWarning = page.getByText("Warning: The E-Mail Address");
    this.inputEmail = page.getByRole("textbox", { name: "* E-Mail Address" });
    this.backButton = page.getByRole("link", { name: "Back" });
    this.breadcrumb = page.getByText("Account Forgotten Password");
  }
  async expectForgottenPasswordPage() {
    await expect(this.forgottenPasswordHeading).toBeVisible();
  }
  async clickContinue() {
    await this.continueButton.click();
  }
  async expectWarningMessage() {
    await expect(this.sussessWarning).toBeVisible();
  }
  async expectPlaceHolderText() {
    await expect(this.inputEmail).toHaveAttribute(
      "placeholder",
      "E-Mail Address"
    );
  }
  async inputEmailField(fillmail) {
    await this.inputEmail.fill(fillmail);
  }
  async expectAndClickBack() {
    await expect(this.backButton).toBeVisible();
    await this.backButton.click();
  }
  async expectBreadcrumb() {
    await expect(this.breadcrumb).toBeVisible();
  }
  async expectEmailToBe(expectedEmail) {
    await expect(this.inputEmail).toHaveValue(expectedEmail);
  }
}
export default ForgottenPassword;
