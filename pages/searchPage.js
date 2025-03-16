import { expect } from "@playwright/test";
class SearchPage {
  constructor(page) {
    this.page = page;
    this.productDisplayIMac = page.getByRole("heading", {
      name: "iMac",
      exact: true,
    });
    this.addtoCartButton = page.locator(
      'button[formaction*="checkout/cart.add"]'
    ); // CSS selector in DevTools
    this.shoppingCart = page.getByRole("link", { name: " Shopping Cart" });
    this.susseccMessage = page.getByText("Success: You have added iMac");
    this.noProductsMessage = page.getByText("There is no product that");
  }
  async expectProductDisplayed() {
    await expect(this.productDisplayIMac).toBeVisible();
  }

  async clickAddToCartButton() {
    await this.addtoCartButton.click();
  }
  async expectSuccessMessage() {
    await expect(this.susseccMessage).toBeVisible();
  }
  async goToShoppingCart() {
    await expect(this.shoppingCart).toBeVisible();
    await this.shoppingCart.click();
  }
  async expectNoProductsMessage() {
    await expect(this.noProductsMessage).toBeVisible();
  }
}
export default SearchPage;
