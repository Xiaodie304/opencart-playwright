import { expect } from "@playwright/test";
class MyAccountPage {
  constructor(page) {
    this.page = page;
    this.affiliateHeading = page.getByRole("link", {
      name: "Edit your account information",
    });
    this.logoutRightColumn = page.getByRole("link", { name: "Logout" });
    this.myWishlist = page.getByRole("button", { name: "Add to Cart" });
    this.myAccount = page
      .locator("#column-right")
      .getByRole("link", { name: "My Account" });
    this.OderHistory = page
      .locator("#column-right")
      .getByRole("link", { name: "Order History" });
  }
  async expectLogin() {
    await expect(this.affiliateHeading).toBeVisible();
  }
  async clickLogout() {
    await this.logoutRightColumn.click();
  }
  async addProductToCart() {
    await this.myWishlist.click();
  }
  async expectMyAccount() {
    await expect(this.myAccount).toBeVisible();
  }
  async expectOrderHistory() {
    await expect(this.OderHistory).toBeVisible();
  }
}

export default MyAccountPage;
