import { expect } from "@playwright/test";
class SuccessPage {
  constructor(page) {
    this.page = page;
    this.successUrl = /\/en-gb\?route=checkout\/success$/;
    this.headingSuccess = page.getByRole("link", { name: "Success" });
    this.continueButton = page.getByRole("link", { name: "Continue" });
    this.oderSuccessMessage = page.getByRole("heading", {
      name: "Your order has been placed!",
    });
  }
  async expectSuccessPage() {
    await expect(this.headingSuccess).toBeVisible();
    await expect(this.page).toHaveURL(this.successUrl);
  }
  async clickContinue() {
    await this.continueButton.click();
  }
  async expectOrderSuccessMessage() {
    await expect(this.oderSuccessMessage).toBeVisible();
  }
}
export default SuccessPage;
