import { test } from "@playwright/test";
import HomePage from "../pages/homePage.js";
import LoginPage from "../pages/loginPage.js";
import MyAccountPage from "../pages/myAccountPage.js";

test.describe("Login", () => {
  let context;
  let page;
  let login;
  let home;
  let myAccount;

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    login = new LoginPage(page);
    home = new HomePage(page);
    myAccount = new MyAccountPage(page);
  });

  test.afterEach(async () => {
    await page.close();
    await context.close();
  });

  test("Validate logging into the application using valid credentials", async () => {
    await home.goToHomePage();
    await home.openMyAccount();
    await home.clickLogin();
    await login.login();
    await myAccount.expectLogin();
  });
  test("Validate logging into the application using invalid credentials", async () => {
    await home.goToHomePage();
    await home.openMyAccount();
    await home.clickLogin();
    await login.loginWithInvalidUsernameAndPassword();
    await login.expectInvalidLogin();
  });
  test("Validate logging into the application using invalid password", async () => {
    await home.goToHomePage();
    await home.openMyAccount();
    await home.clickLogin();
    await login.loginWithInvalidPasword();
    await login.expectInvalidLogin();
  });
  test("Validate logging into the application using invalid mail", async () => {
    await home.goToHomePage();
    await home.openMyAccount();
    await home.clickLogin();
    await login.loginWithInvalidMail();
    await login.expectInvalidLogin();
  });
  test("Validate logging into the application without providing anhy credentials", async () => {
    await home.goToHomePage();
    await home.openMyAccount();
    await home.clickLogin();
    await login.loginWithoutCredentials();
    await login.expectInvalidLogin();
  });
  test("Validate 'Forgotten Password' link is available in the Login page and is working", async () => {
    await home.goToHomePage();
    await home.openMyAccount();
    await home.clickLogin();
    await login.expectForgottenPassword();
    await login.clickForgottenPassword();
  });
  test("Validate logging into the application and browsing back using browsing back button", async () => {
    await home.goToHomePage();
    await home.openMyAccount();
    await home.clickLogin();
    await login.login();
    await myAccount.expectLogin();
    await page.goBack();
    await home.openMyAccount();
    await home.expectLoginHidden();
  });
});
