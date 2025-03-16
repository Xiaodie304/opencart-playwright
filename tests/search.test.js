import { test } from "@playwright/test";
import HomePage from "../pages/homePage.js";
import LoginPage from "../pages/loginPage.js";
import MyAccountPage from "../pages/myAccountPage.js";
import SearchPage from "../pages/searchPage.js";
import ShoppingCartPage from "../pages/shoppingCartPage.js";

test.describe("Search", () => {
  let context;
  let page;
  let login;
  let home;
  let myAccount;
  let search;
  let shoppingCart;

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    login = new LoginPage(page);
    home = new HomePage(page);
    myAccount = new MyAccountPage(page);
    search = new SearchPage(page);
    shoppingCart = new ShoppingCartPage(page);
  });

  test.afterEach(async () => {
    await page.close();
    await context.close();
  });
  test("Validate searching with an existing Product Name", async () => {
    await home.goToHomePage();
    await home.fiilSearchBoxAndClickSearch();
    await search.expectProductDisplayed();
  });
  test("Validate searching with a non existing Product Name", async () => {
    await home.goToHomePage();
    await home.fillSearchBoxAndClickSearchWithNonExistingProduct();
    await search.expectNoProductsMessage();
  });
  test("Validate searching without providing any Product Name", async () => {
    await home.goToHomePage();
    await home.noFillSearchBoxAndClickSearch();
    await search.expectNoProductsMessage();
  });
  test("Validate searching for a product after login to the Application", async () => {
    await home.goToHomePage();
    await home.openMyAccount();
    await home.clickLogin();
    await login.login();
    await myAccount.expectLogin();
    await home.clickLogoOpencart();
    await home.fiilSearchBoxAndClickSearch();
    await search.expectProductDisplayed();
  });
});
