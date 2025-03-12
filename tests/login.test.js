const { test, expect } = require("@playwright/test");
const HomePage = require("../pages/homePage");
const LoginPage = require("../pages/loginPage");

test.describe("Login", () => {
  let context;
  let page;
  let login;
  let home;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    login = new LoginPage(page);
    home = new HomePage(page);
  });

  test.afterAll(async () => {
    await page.close();
    await context.close();
  });

  test("Validate logging into the application using valid credentials", async () => {
    await home.goToHomePage();
    await home.openMyAccount();
    await home.clickLogin();
    await login.login();
  });
});
