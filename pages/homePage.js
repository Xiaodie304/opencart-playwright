import { expect } from "@playwright/test";
class HomePage {
  constructor(page) {
    this.page = page;
    this.myAccountLink = page.getByRole("link", { name: " My Account " });
    this.loginLink = page.locator("#top").getByRole("link", { name: "Login" });
    this.homeYourStore = page.getByRole("link", { name: "Your Store" });
  }

  async goToHomePage() {
    await this.page.goto("/en-gb?route=common/home");
    await expect(this.homeYourStore).toBeVisible();
  }

  async openMyAccount() {
    await this.myAccountLink.click();
  }

  async clickLogin() {
    await this.loginLink.click();
  }
}

export default HomePage;
