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
  test("TC01-Validate searching with an existing Product Name", async () => {
    await home.goToHomePage();
    await home.fillSearchBoxAndClickSearch("iMac");
    await search.expectProductDisplayed();
  });
  test("TC02-Validate searching with a non existing Product Name", async () => {
    await home.goToHomePage();
    await home.fillSearchBoxAndClickSearch("Fibit");
    await search.expectNoProductsMessage();
  });
  test("TC03-Validate searching without providing any Product Name", async () => {
    await home.goToHomePage();
    await home.fillSearchBoxAndClickSearch();
    await search.expectNoProductsMessage();
  });
  test("TC04-Validate searching for a product after login to the Application", async () => {
    await home.goToHomePage();
    await home.openMyAccount();
    await home.clickLogin();
    await login.login();
    await myAccount.expectLogin();
    await home.clickLogoOpencart();
    await home.fillSearchBoxAndClickSearch("iMac");
    await search.expectProductDisplayed();
  });
  test("TC05-Validate searching by providing a search criteria which results in mulitple products", async () => {
    await home.goToHomePage();
    await home.fillSearchBoxAndClickSearch("Mac");
    await search.expectMultipleProductsDisplayed();
  });
  test("TC06-Validate searching using 'Search Criteria' field", async () => {
    await home.goToHomePage();
    await home.fillSearchBoxAndClickSearch();
    await search.fillSearchCriteriaAndClickSearch("Mac");
    await search.expectMultipleProductsDisplayed();
  });
  test("TC07-Validate Search by selecting the category of products", async () => {
    await home.goToHomePage();
    await home.fillSearchBoxAndClickSearch();
    await search.fillSearchCriteriaAndClickSearch("Mac");
    await search.expectMultipleProductsDisplayed();
    await page.locator("#input-category").selectOption("26"); // PC
    await search.clickSearchButtonInSearchPage();
    await search.expectNoProductsMessage();
  });
  test("TC08-Validate Search by selecting to search in subcategories", async () => {
    await home.goToHomePage();
    await home.fillSearchBoxAndClickSearch();
    await search.fillSearchCriteriaAndClickSearch("Mac");
    await search.expectMultipleProductsDisplayed();
    await page.locator("#input-category").selectOption("20"); // Desktops
    await search.clickSearchButtonInSearchPage();
    await search.expectIMacDisplayed();
  });
});
