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
  }
  async expectShoppingCart() {
    await expect(this.shoppingCart).toBeVisible();
  }
  async clickContinueShopping() {
    await expect(this.comntinueShopping).toBeVisible();
    await this.comntinueShopping.click();
  }
}
export default ShoppingCartPage;
