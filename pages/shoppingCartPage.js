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
    this.emptyCart = page
      .locator("#shopping-cart")
      .getByText("Your shopping cart is empty!");
    this.checkoutButton = page.getByRole("link", {
      name: "Checkout",
      exact: true,
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
  async expectEmptyCart() {
    await expect(this.emptyCart).toBeVisible();
  }
  async clickCheckout() {
    await expect(this.checkoutButton).toBeVisible();
    await this.checkoutButton.click();
  }
}
export default ShoppingCartPage;
