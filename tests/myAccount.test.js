import { test } from "@playwright/test";
import HomePage from "../pages/homePage.js";
import Helper from "../utils/helper.js";
import MyAccountPage from "../pages/myAccountPage.js";

test.describe("Checkout", () => {
  let context, page;
  let home, helper, myAccount;

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    home = new HomePage(page);
    helper = new Helper(page);
    myAccount = new MyAccountPage(page);
  });
  test.afterEach(async () => {
    await page.close();
    await context.close();
  });
  test("TC01-Validate navigating to 'My Account' page on login", async () => {
    await home.goToHomePage();
    await helper.methodLogin();
    await myAccount.expectMyAccount();
  });
  test("TC02-Validate navigating to 'My Account' page using 'My Account' option", async () => {
    await home.goToHomePage();
    await helper.methodLogin();
    await home.openMyAccount();
    await home.clickMyAccount();
    await myAccount.expectMyAccount();
  });
  test("TC03-Validate navigating to 'My Account' page using 'Right Column' options", async () => {
    await home.goToHomePage();
    await helper.methodLogin();
    await home.openMyAccount();
    await home.clickMyAccount();
    await myAccount.expectMyAccount();
    await myAccount.expectOrderHistory();
  });
  test("TC04-Validate navigating to 'My Account' page using 'Left Column' options", async () => {
    await home.goToHomePage();
    await helper.methodLogin();
    await home.clickLogoOpencart();
    await home.expectMyAccountFooterAndClick();
    await myAccount.expectMyAccount();
  });
});
