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
}
export default RegisterPage;
