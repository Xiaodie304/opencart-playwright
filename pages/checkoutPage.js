import { expect } from "@playwright/test";
class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.headingCheckout = page.getByRole("heading", { name: "Checkout" });
    this.checkoutInBlackIcon = page
      .locator("#cart")
      .getByRole("link", { name: " Checkout" });
    this.blackCheckoutButton = page.getByRole("button", {
      name: " 1 item(s) - $",
    });
    this.existingAddress = page.getByRole("radio", {
      name: "I want to use an existing",
    });
    this.existingAddressDropdown = this.page.locator("#input-shipping-address");
    this.shippingMethod = page.locator("#button-shipping-methods");
    this.shippingMethodOption = page.getByRole("button", { name: "Continue" });
    this.paymentMethod = page.locator("#button-payment-methods");
    this.paymentMethodOption = page.getByRole("button", { name: "Continue" });
    this.addComment = page.getByRole("textbox", {
      name: "Add Comments About Your Order",
    });
    this.confirmOrderButton = page.getByRole("button", {
      name: "Confirm Order",
    });
    this.newAddress = page.getByRole("radio", {
      name: "I want to use a new address",
    });
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.firstNameError = page.getByText("First Name must be between 1");
    this.lastNameError = page.getByText("Last Name must be between 1");
    this.addressError = page.getByText("Last Name must be between 1");
    this.confirmOrderButtonHidden = page
      .locator("div")
      .filter({ hasText: /^Confirm Order$/ });
  }
  async expectCheckoutPage() {
    await expect(this.headingCheckout).toBeVisible();
  }
  async clickBlackCheckoutButton() {
    await this.blackCheckoutButton.click();
  }
  async clickCheckoutInBlackIcon() {
    await this.checkoutInBlackIcon.click();
  }
  async clickExistingAddress() {
    await this.existingAddress.click();
    await this.existingAddressDropdown.selectOption({ value: "1" });
  }
  async clickShippingMethod() {
    await this.page.waitForTimeout(500);
    await this.shippingMethod.click();
    await this.shippingMethodOption.click();
  }
  async clickPaymentMethod() {
    await this.page.waitForTimeout(500);
    await this.paymentMethod.click();
    await this.paymentMethodOption.click();
  }
  async addCommentToOrder(comment) {
    await this.addComment.fill(comment);
  }
  async confirmOrder() {
    await expect(this.confirmOrderButton).toBeVisible();
    await this.confirmOrderButton.click();
  }
  async clickNewAddress() {
    await this.newAddress.click();
  }
  async clickContinue() {
    await this.continueButton.click();
  }
  async expectValidationError() {
    await expect(this.firstNameError).toBeVisible();
    await expect(this.lastNameError).toBeVisible();
    await expect(this.addressError).toBeVisible();
  }
  async expectConfirmToOrderHidden() {
    await expect(this.confirmOrderButtonHidden).toBeVisible();
  }
}
export default CheckoutPage;
