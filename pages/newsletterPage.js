import { expect } from "@playwright/test";
class NewsletterPage {
  constructor(page) {
    this.page = page;
    this.newsletterButton = page.locator("#input-newsletter");
    this.newsletterPage = page
      .locator("#account-newsletter")
      .getByRole("list")
      .getByRole("link", { name: "Newsletter" });
    this.newsletterFooter = page
      .getByRole("contentinfo")
      .getByRole("link", { name: "Newsletter" });
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.sussessMessage = page.getByText("Success: Your newsletter");
    this.breadcrumb = page.getByText("Account Newsletter");
  }
  async expectNewsletterSubscription() {
    await expect(this.newsletterPage).toBeVisible();
  }
  async expectNewsletterOff() {
    await expect(this.newsletterButton).not.toBeChecked();
  }
  async expectNewsletterOn() {
    await expect(this.newsletterButton).toBeChecked();
  }
  async clickNewsletterFooter() {
    await this.newsletterFooter.click();
  }
  async alwaysExpectNewsletterOn() {
    if (!(await this.newsletterButton.isChecked())) {
      await this.newsletterButton.check();
    }
  }
  async clickContinue() {
    await this.continueButton.click();
  }
  async expectSuccessMessage() {
    await expect(this.sussessMessage).toBeVisible();
  }
  async expectBreadcrumb() {
    await expect(this.breadcrumb).toBeVisible();
  }
}
export default NewsletterPage;
