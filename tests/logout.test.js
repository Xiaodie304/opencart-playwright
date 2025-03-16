import { test } from "@playwright/test";
import HomePage from "../pages/homePage.js";
import MyAccountPage from "../pages/myAccountPage.js";
import LogOut from "../pages/logoutPage.js";
import Helper from "../utils/helper.js";

test.describe("Login", () => {
  let context;
  let page;
  let home;
  let myAccount;
  let logout;
  let helper;

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    home = new HomePage(page);
    myAccount = new MyAccountPage(page);
    logout = new LogOut(page);
    helper = new Helper(page);
    await helper.methodLogin();
  });

  test.afterEach(async () => {
    await page.close();
    await context.close();
  });
  test("TC-01 Validate logging into the application using valid credentials", async () => {
    await home.openMyAccount();
    await home.clickLogout();
    await logout.expectLogout();
    await logout.clickContinueLogout();
    await home.goToHomePage();
  });
  test("TC-02 Validate Logging out by selecting Logout option from 'Right Column' options", async () => {
    await myAccount.clickLogout();
    await logout.expectLogout();
    await logout.clickContinueLogout();
    await home.goToHomePage();
  });
  test("TC-03 Validate Logout option is not displayed under 'My Account' menu before logging in", async () => {
    await myAccount.clickLogout();
    await logout.expectLogout();
    await logout.clickContinueLogout();
    await home.goToHomePage();
    await home.openMyAccount();
    await home.expectLogoutHidden();
  });
  test("TC-04 Validate logging out from the applocation and browsing back using browser back button", async () => {
    await myAccount.clickLogout();
    await logout.expectLogout();
    await page.goBack();
    await home.openMyAccount();
    await home.expectLogoutHidden();
    await page.pause();
  });
});
