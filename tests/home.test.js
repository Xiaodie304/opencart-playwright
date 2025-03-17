import { test } from "@playwright/test";
import HomePage from "../pages/homePage.js";
import SearchPage from "../pages/searchPage.js";
import shoppingCartPage from "../pages/shoppingCartPage.js";

test.describe("Home", () => {
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
    shoppingCart = new shoppingCartPage(page);
  });

  test.afterEach(async () => {
    await page.close();
    await context.close();
  });
  test("TC01-Validate navigating to Home Page from 'Shopping Cart' page", async () => {
    await home.goToHomePage();
    await home.fillSearchBoxAndClickSearch("iMac");
    await search.expectProductDisplayed();
    await search.clickAddToCartButton();
    await search.expectSuccessMessage();
    await search.goToShoppingCart();
    await shoppingCart.expectShoppingCart();
    await shoppingCart.clickContinueShopping(); // go to home page
    await home.expectHomeYourStore();
  });
  test("TC02-Validate navigating to Home page from any page of the Applcation using Logo", async () => {
    await page.goto("/en-gb?route=account/login");
    await page.waitForLoadState("domcontentloaded");
    await home.clickLogoOpencart();
    await home.expectHomeYourStore();
    await page.goto("/en-gb?route=checkout/cart");
    await home.clickLogoOpencart();
    await home.expectHomeYourStore();
    await page.goto("/en-gb?route=checkout/cart");
    await home.clickLogoOpencart();
    await home.expectHomeYourStore();
  });
  test("TC03-Validate navigating to Home page from any Category Page which don't have any products", async () => {
    await home.goToHomePage();
    await home.clickMenuDesktopsPc();
    await home.expectHomeYourStore();
  });
  test("TC04-Validate four featured products should be displayed in the Home Page", async () => {
    await home.goToHomePage();
    await home.expectHomeYourStore();
    await home.methodExpectFeaturedProducts();
  });
});
