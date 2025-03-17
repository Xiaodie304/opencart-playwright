import { test } from "@playwright/test";
import HomePage from "../pages/homePage.js";
import SearchPage from "../pages/searchPage.js";
import ShoppingCartPage from "../pages/shoppingCartPage.js";

test.describe("Product Display", () => {
  let context;
  let page;
  let home;
  let search;
  let shoppingCart;

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    home = new HomePage(page);
    search = new SearchPage(page);
    shoppingCart = new ShoppingCartPage(page);
  });

  test.afterEach(async () => {
    await page.close();
    await context.close();
  });
  test("TC01-Validate that Product Name, Brand and Product Code are displayed in the Product Display Page", async () => {
    await home.goToHomePage();
    await home.fillSearchBoxAndClickSearch("iMac");
    await search.expectProductDisplayed();
  });
  test("TC02-Validate the availabilty status of the Product in the Product Display Page", async () => {
    await home.goToHomePage();
    await home.fillSearchBoxAndClickSearch("iMac");
    await search.expectAvailabilityStock();
  });
  test("TC03-Validate the Price of the Product with and without tax is displayed in the Product Display Page", async () => {
    await home.goToHomePage();
    await home.fillSearchBoxAndClickSearch("iMac");
    await search.expectPriceAndTax();
  });
  test("TC04-Validate the default quanity for the Product is displayed as 1 in the Product Display Page, when there is no minimum quantity set for the Product", async () => {
    await home.goToHomePage();
    await home.fillSearchBoxAndClickSearch("iMac");
    await search.expectProductDisplayed();
    await search.inputQtyProduct("20");
    await search.clickAddToCartButton();
    await search.expectSuccessMessage();
  });
  test("TC05-Validate the description of the Product in the Product Display Page", async () => {
    await home.goToHomePage();
    await home.fillSearchBoxAndClickSearch("iMac");
    await search.expectProductDescription();
  });
  test("TC06-Validate the 'Reviews' tab when there are no reviews or zero reviews added", async () => {
    await home.goToHomePage();
    await home.fillSearchBoxAndClickSearch("iMac");
    await search.expectProductReviews();
  });
  test("TC07-Validate all the fields in the 'Review' tab are mandatory fields", async () => {
    await home.goToHomePage();
    await home.fillSearchBoxAndClickSearch("iMac");
    await search.expectManadatoryField();
  });
  test("TC08-Validate the negative quantity or zero quantity should not be allowed in the Product Display Page", async () => {
    const quantity = Math.random() < 0.5 ? "-1" : "0";
    await home.goToHomePage();
    await home.fillSearchBoxAndClickSearch("iMac");
    await search.expectProductDisplayed();
    await search.inputQtyProduct(quantity);
    await search.clickAddToCartButton();
    await search.expectWarringMessage();
  });
});
