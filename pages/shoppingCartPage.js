import { expect } from "@playwright/test";
class ShoppingCartPage {
  constructor(page) {
    this.page = page;
    this.shoppingCart = page.getByRole("link", {
      name: "Shopping Cart",
      exact: true,
    });
    this.comntinueShopping = page.getByRole("link", {
      name: "Continue Shopping",
    });
    this.iMacProduct = page.getByRole("cell", {
      name: "iMac - Model: Product",
    });
  }
  async expectShoppingCart() {
    await expect(this.shoppingCart).toBeVisible();
  }
  async clickContinueShopping() {
    await expect(this.comntinueShopping).toBeVisible();
    await this.comntinueShopping.click();
  }
  async expectIMacProduct() {
    await expect(this.iMacProduct).toBeVisible();
  }
}
export default ShoppingCartPage;
