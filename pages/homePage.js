import { expect } from "@playwright/test";
class HomePage {
  constructor(page) {
    this.page = page;
    this.myAccountLink = page.getByRole("link", { name: " My Account " });
    this.loginLink = page.locator("#top").getByRole("link", { name: "Login" });
    this.homeYourStore = page.getByRole("link", { name: "Your Store" });
    this.logout = this.page
      .locator("#top")
      .getByRole("link", { name: "Logout" });
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
  async clickLogout() {
    await expect(this.logout).toBeVisible();
    await this.logout.click();
  }
  async expectLogoutHidden() {
    await expect(this.logout).not.toBeVisible();
  }
  async expectLoginHidden() {
    await expect(this.loginLink).not.toBeVisible();
  }
}

export default HomePage;
