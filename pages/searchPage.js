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
    this.wishListButton = page.locator('button[formaction*="wishlist.add"]');
    this.shoppingCart = page.getByRole("link", { name: " Shopping Cart" });
    this.susseccMessage = page.getByText("Success: You have added iMac");
    this.warringMessage = page.getByText("Warning:");
    this.noProductsMessage = page.getByText("There is no product that");
    this.iMac = page.getByText("iMac", { exact: true });
    this.macBook = page.getByText("MacBook", { exact: true });
    this.fillsearchCriteria = page.getByRole("textbox", {
      name: "Search Criteria",
    });
    this.searchButton = page.getByRole("button", { name: "Search" });
    this.imgIMac = page.getByRole("link", { name: "iMac" }).first();
    this.iMacDetail = page.getByRole("heading", { name: "iMac" });
    this.iMacDetail2 = page.getByText("Brand: Apple");
    this.iMacDetail3 = page.getByText("Product Code: Product");
    this.iMacDetail4 = page.locator(".image").first();
    this.availabilityStockIn = page.getByText("Availability: In Stock");
    this.availabilityStockOut = page.getByText("Availability: Out Stock");
    this.priceProduct = page
      .getByRole("heading", { name: "$" })
      .locator("span");
    this.taxProduct = page
      .getByRole("listitem")
      .filter({ hasText: "Ex Tax: $" });
    this.qtyProduct = page.getByText("Qty");
    this.qtyProductValue = page.locator("#input-quantity");
    this.productDescription = page.getByRole("tab", { name: "Description" });
    this.zeroReview = page.getByRole("tab", { name: "Reviews (0)" });
    this.writeReview = page.getByRole("heading", { name: "Write a review" });
    this.reviewName = page.getByRole("textbox", { name: "* Your Name" });
    this.reviewText = page.getByRole("textbox", { name: "* Your Review" });
    this.reviewRating = page.getByText("Bad Good");
    this.mandatoryField = page.getByText("Review Name must be between 3");
    this.continueButtonReview = page.getByRole("button", {
      name: "Continue",
    });
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
  async expectMultipleProductsDisplayed() {
    await expect(this.iMac).toBeVisible();
    await expect(this.macBook).toBeVisible();
  }
  async fillSearchCriteriaAndClickSearch(fillSearch = null) {
    if (fillSearch) {
      await this.fillsearchCriteria.fill(fillSearch);
    }
    await this.fillsearchCriteria.press("Enter");
  }
  async clickSearchButtonInSearchPage() {
    await this.searchButton.click();
  }
  async expectIMacDisplayed() {
    await expect(this.iMac).toBeVisible();
  }
  async clickProductIMacAndExpectProduct() {
    await this.imgIMac.click();
    await expect(this.iMacDetail).toBeVisible();
    await expect(this.iMacDetail2).toBeVisible();
    await expect(this.iMacDetail3).toBeVisible();
    await expect(this.iMacDetail4).toBeVisible();
  }
  async expectAvailabilityStock() {
    await this.imgIMac.click();
    if (await this.availabilityStockIn.isVisible()) {
      await expect(this.availabilityStockIn).toBeVisible();
    } else {
      await expect(this.availabilityStockOut).toBeVisible();
    }
  }
  async expectPriceAndTax() {
    await this.imgIMac.click();
    await expect(this.priceProduct).toBeVisible();
    await expect(this.taxProduct).toBeVisible();
  }
  async inputQtyProduct(qty) {
    await this.imgIMac.click();
    await expect(this.qtyProduct).toBeVisible();
    await this.qtyProductValue.clear();
    await this.qtyProductValue.fill(qty);
  }
  async clickAddToCartButton() {
    await this.addtoCartButton.click();
  }
  async expectProductDescription() {
    await this.imgIMac.click();
    await this.productDescription.click();
  }
  async expectProductReviews() {
    await this.imgIMac.click();
    await expect(this.zeroReview).toBeVisible();
  }
  async expectManadatoryField() {
    await this.imgIMac.click();
    await this.zeroReview.click();
    await this.continueButtonReview.click();
    await expect(this.mandatoryField).toBeVisible();
  }
  async expectWarringMessage() {
    await expect(this.warringMessage).toBeVisible();
  }
  async clickWishListButton() {
    await this.wishListButton.click();
  }
}
export default SearchPage;
