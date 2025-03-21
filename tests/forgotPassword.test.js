import { test, expect } from "@playwright/test";
import HomePage from "../pages/homePage.js";
import SearchPage from "../pages/searchPage.js";
import LoginPage from "../pages/loginPage.js";
import ForgottenPassword from "../pages/forgottenPassword.js";

test.describe("Forgot Password", () => {
  let context, page;
  let home, search, login, forgottenPassword;

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    home = new HomePage(page);
    search = new SearchPage(page);
    login = new LoginPage(page);
    forgottenPassword = new ForgottenPassword(page);
  });

  test.afterEach(async () => {
    await page.close();
    await context.close();
  });
  test("TC01-Validate reseting the Password without providing the registered email address", async () => {
    await home.goToHomePage();
    await home.openMyAccount();
    await home.clickLogin();
    await login.clickForgottenPassword();
    await forgottenPassword.expectForgottenPasswordPage();
    await forgottenPassword.clickContinue();
    await forgottenPassword.expectWarningMessage();
  });
  test("TC02-Verifty Placehold text is displayed in the 'E-Mail Address' field of 'Forgotten Password' page", async () => {
    await home.goToHomePage();
    await home.openMyAccount();
    await home.clickLogin();
    await login.clickForgottenPassword();
    await forgottenPassword.expectForgottenPasswordPage();
    await forgottenPassword.expectPlaceHolderText();
  });
  test("TC03-Validate 'E-Mail Address' fied on the 'Forgotten Password' page is marked as mandatory", async () => {
    await home.goToHomePage();
    await home.openMyAccount();
    await home.clickLogin();
    await login.clickForgottenPassword();
    await forgottenPassword.expectForgottenPasswordPage();
    await forgottenPassword.inputEmailField("");
    await forgottenPassword.clickContinue();
    await forgottenPassword.expectWarningMessage();
  });
  test("TC04-Validate entering invalid format email address into the 'E-Mail Address' field of 'Forgotten Password' page", async () => {
    await home.goToHomePage();
    await home.openMyAccount();
    await home.clickLogin();
    await login.clickForgottenPassword();
    await forgottenPassword.expectForgottenPasswordPage();
    await forgottenPassword.inputEmailField("example.com");
    await forgottenPassword.clickContinue();
    await forgottenPassword.expectWarningMessage();
  });
  test("TC05-Validate Back button on the 'Forgotten Password' page", async () => {
    await home.goToHomePage();
    await home.openMyAccount();
    await home.clickLogin();
    await login.clickForgottenPassword();
    await forgottenPassword.expectForgottenPasswordPage();
    await forgottenPassword.expectAndClickBack();
    await login.expectLoginPage();
  });
  test("TC06-Validate navigating to 'Forgotten Password' page from 'Right Column' options", async () => {
    await home.goToHomePage();
    await home.openMyAccount();
    await home.clickLogin();
    await login.clickForgottenPasswordFromRightColumn();
    await forgottenPassword.expectForgottenPasswordPage();
  });
  test("TC07-Validate Breadcrumb of the 'Forgotten Password' page", async () => {
    await home.goToHomePage();
    await home.openMyAccount();
    await home.clickLogin();
    await login.clickForgottenPassword();
    await forgottenPassword.expectForgottenPasswordPage();
    await forgottenPassword.expectBreadcrumb();
  });
  test("TC08-Validate the email address provided in the 'E-Mail Address' field of 'Login' page, need to be carry forwarded to the 'Forgotten Password' page", async () => {
    await home.goToHomePage();
    await home.openMyAccount();
    await home.clickLogin();
    await login.inputEmailField(process.env.TEST_USERNAME);
    await login.clickForgottenPassword();
    await page.pause();
    await forgottenPassword.expectEmailToBe(process.env.TEST_USERNAME);
  });
  test("TC09-Validate the email address provided in the 'E-Mail Address' field of 'Login' page, need to be carry forwarded to the 'Forgotten Password' page", async () => {
    await home.goToHomePage();
    await home.openMyAccount();
    await home.clickLogin();
    await login.inputEmailField(process.env.TEST_USERNAME);
    await login.clickForgottenPassword();
    await forgottenPassword.expectEmailToBe(process.env.TEST_USERNAME);
  });
});
