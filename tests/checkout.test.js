import { test } from "@playwright/test";
import HomePage from "../pages/homePage.js";
import SearchPage from "../pages/searchPage.js";
import ShoppingCartPage from "../pages/shoppingCartPage.js";
import Helper from "../utils/helper.js";
import MyAccountPage from "../pages/myAccountPage.js";
import DesktopsPage from "../pages/desktopsPage.js";

test.describe("Checkout", () => {
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
});
