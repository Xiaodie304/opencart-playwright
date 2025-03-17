import { test } from "@playwright/test";
import HomePage from "../pages/homePage.js";
import SearchPage from "../pages/searchPage.js";
import ShoppingCartPage from "../pages/shoppingCartPage.js";
import Helper from "../utils/helper.js";
import MyAccountPage from "../pages/myAccountPage.js";
import DesktopsPage from "../pages/desktopsPage.js";

test.describe("Add To Cart", () => {
  let context;
  let page;
  let home;
  let search;
  let shoppingCart;
  let helper;
  let myAccount;
  let desktops;

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    home = new HomePage(page);
    search = new SearchPage(page);
    shoppingCart = new ShoppingCartPage(page);
    helper = new Helper(page);
    myAccount = new MyAccountPage(page);
    desktops = new DesktopsPage(page);
  });

  test.afterEach(async () => {
    await page.close();
    await context.close();
  });
  test("TC01-Validate adding the product to Cart from 'Product Display' Page", async () => {
    await home.goToHomePage();
    await home.fillSearchBoxAndClickSearch("iMac");
    await search.expectProductDisplayed();
    await search.clickAddToCartButton();
    await search.expectSuccessMessage();
    await search.goToShoppingCart();
    await shoppingCart.expectShoppingCart();
  });
  test("TC02-Validate adding the product to Cart from 'Wish List' Page", async () => {
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
  test("TC03-Validate adding the product to Cart from Search Results Page", async () => {
    await home.goToHomePage();
    await home.fillSearchBoxAndClickSearch("iMac");
    await search.expectProductDisplayed();
    await search.clickAddToCartButton();
    await search.expectSuccessMessage();
    await home.clickShoppingCartIconBlack();
    await shoppingCart.expectShoppingCart();
  });
  test("TC04-Validate adding the product to Cart from the Related Products section of the Product Display Page", async () => {
    await home.goToHomePage();
    const searchTerm = "Apple Cinema 30";
    await home.fillSearchBoxAndClickSearch(searchTerm);
    await page.getByRole("heading", { name: `Search - ${searchTerm}` });
    await search.clickAddToCartButton3();
    await search.expectSuccessMessage();
    await search.shoppingCartLinkInSuccessMessage();
    await shoppingCart.expectShoppingCart();
  });
  test("TC05-Validate adding the product to Cart from the Products displayed in the category or sub-category page", async () => {
    await home.goToHomePage();
    await home.clickMenuDesktopsAndShowAll();
    await desktops.expectDesktopsPage();
    await desktops.clickIMacProduct();
    await search.clickAddToCartButton();
    await home.gotoShoppingCartPage();
    await shoppingCart.expectIMacProduct();
  });
  test("TC06-Validate adding the product to Cart from the Products displayed in the 'Featured' section of Home page", async () => {
    await home.goToHomePage();
    await home.addIphoneToCartInFeatured();
    await search.expectSuccessMessage();
    await search.shoppingCartLinkInSuccessMessage();
    await shoppingCart.expectShoppingCart();
  });
});
