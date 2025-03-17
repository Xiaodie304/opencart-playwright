import { test } from "@playwright/test";
import HomePage from "../pages/homePage.js";
import SearchPage from "../pages/searchPage.js";
import ShoppingCartPage from "../pages/shoppingCartPage.js";
import Helper from "../utils/helper.js";
import MyAccountPage from "../pages/myAccountPage.js";

test.describe("Product Display", () => {
  let context;
  let page;
  let home;
  let search;
  let shoppingCart;
  let helper;
  let myAccount;

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    home = new HomePage(page);
    search = new SearchPage(page);
    shoppingCart = new ShoppingCartPage(page);
    helper = new Helper(page);
    myAccount = new MyAccountPage(page);
  });

  test.afterEach(async () => {
    await page.close();
    await context.close();
  });
  test("Validate adding the product to Cart from 'Product Display' Page", async () => {
    await home.goToHomePage();
    await home.fillSearchBoxAndClickSearch("iMac");
    await search.expectProductDisplayed();
    await search.clickAddToCartButton();
    await search.expectSuccessMessage();
    await search.goToShoppingCart();
    await shoppingCart.expectShoppingCart();
  });
  test("Validate adding the product to Cart from 'Wish List' Page", async () => {
    await helper.methodLogin();
    await home.goToHomePage();
    await home.fillSearchBoxAndClickSearch("iMac");
    await search.expectProductDisplayed();
    await search.clickWishListButton();
    await search.expectSuccessMessage();
    await home.clickWishList();
    await myAccount.addProductToCart();
    await search.expectSuccessMessage();
  });
  test("Validate adding the product to Cart from Search Results Page", async () => {
    await home.goToHomePage();
    await home.fillSearchBoxAndClickSearch("iMac");
    await search.expectProductDisplayed();
    await search.clickAddToCartButton();
    await search.expectSuccessMessage();
    await home.clickShoppingCartIconBlack();
    await shoppingCart.expectShoppingCart();
    await page.pause();
  });
});
