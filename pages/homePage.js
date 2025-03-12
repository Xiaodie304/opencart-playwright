class HomePage {
  constructor(page) {
    this.page = page;
    this.myAccountLink = page.getByRole("link", { name: " My Account " });
    this.loginLink = page.locator("#top").getByRole("link", { name: "Login" });
  }

  async goToHomePage() {
    await this.page.goto("en-gb?route=common/home");
  }

  async openMyAccount() {
    await this.myAccountLink.click();
  }

  async clickLogin() {
    await this.loginLink.click();
  }
}
module.exports = HomePage;
