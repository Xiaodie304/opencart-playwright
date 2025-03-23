import { expect } from "@playwright/test";
class RegisterPage {
  constructor(page) {
    this.page = page;
    this.registerPage = page
      .getByRole("listitem")
      .filter({ hasText: /^Register$/ })
      .getByRole("link");
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.privacyPolicy = page.locator('input[name="agree"]');
    this.notiCreateAccount = page.getByRole("link", {
      name: "Your Account Has Been Created!",
    });
    this.continueButton2 = page.getByRole("link", { name: "Continue" });
    this.newsletterYes = page.locator("#input-newsletter");
    this.inputFirstName = page.getByRole("textbox", { name: "* First Name" });
    this.inputLastName = page.getByRole("textbox", { name: "* Last Name" });
    this.inputEmail = page.getByRole("textbox", { name: "* E-Mail" });
    this.inputPassword = page.getByRole("textbox", { name: "* Password" });
    this.warringSusscess = page.getByText("Warning: E-Mail Address is");
  }
  async expectRegisterPage() {
    await expect(this.registerPage).toBeVisible();
  }
  async clickContinueRegister() {
    await this.continueButton.click();
  }
  async expectNotiCreatedAccount() {
    await expect(this.notiCreateAccount).toBeVisible();
  }
  async clickContinueAndGoToMyAccount() {
    await this.continueButton2.click();
  }
  async privacyPolicyCheck() {
    await this.privacyPolicy.check();
  }
  async clickNewsletterYes() {
    await this.newsletterYes.check();
  }
  async fillExistingEmail() {
    await this.inputFirstName.fill("John");
    await this.inputLastName.fill("Doe");
    await this.inputEmail.fill(process.env.TEST_USERNAME);
    await this.inputPassword.fill(process.env.TEST_PASSWORD);
  }
  async expectWarringSusscess() {
    await this.page.waitForTimeout(500);
    await expect(this.warringSusscess).toBeVisible();
  }
  async clearEmailAndFillNewEmail(newmail) {
    await this.inputEmail.fill("");
    await this.inputEmail.fill(newmail);
  }
  async expectInvalidEmail() {
    const emailInput = this.inputEmail;
    const errorMessage = await emailInput.evaluate(
      (el) => el.validationMessage
    );
    console.log("ErrorMessage:", errorMessage);
    expect(errorMessage).toMatch(/@|email address/i);
  }
  async exportMail() {
    return this.inputEmail.inputValue();
  }
}
export default RegisterPage;
