import { test } from "@playwright/test";
import Helper from "../utils/helper.js";
import HomePage from "../pages/homePage.js";
import MyAccountPage from "../pages/myAccountPage.js";
import NewsletterPage from "../pages/newsletterPage.js";

test.describe("Home", () => {
  let context, page;
  let home, myAccount, helper, newsletter;

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    home = new HomePage(page);
    myAccount = new MyAccountPage(page);
    helper = new Helper(page);
    newsletter = new NewsletterPage(page);
  });

  test.afterEach(async () => {
    await page.close();
    await context.close();
  });
  test("TC01-Validate navigating to 'Newsletter Subscription' page from 'My Account' page", async () => {
    await home.goToHomePage();
    await helper.methodLogin();
    await myAccount.clickNewsletterOption();
    await newsletter.expectNewsletterSubscription();
    await page.pause();
  });
  test("TC02-Validate navigating to 'Newsletter Subscription' page using Right Column options", async () => {
    await home.goToHomePage();
    await helper.methodLogin();
    await myAccount.clickNewsletterRightColumn();
    await newsletter.expectNewsletterSubscription();
    await page.pause();
  });
  test("TC03-Validate navigating to 'Newsletter' page by selecting the option from Right Column options before login", async () => {
    await home.goToHomePage();
    await home.openMyAccount();
    await home.clickLogin();
    await myAccount.clickNewsletterRightColumn();
    await helper.login();
    await newsletter.expectNewsletterSubscription();
  });
  test("TC04-Validate navigating to 'Newsletter' page by selecting the option using 'Newsletter' Footer option before login", async () => {
    await home.goToHomePage();
    await home.clickNewsletter();
    await helper.login();
    await newsletter.expectNewsletterSubscription();
  });
  test("TC05-Validate navigating to 'Newsletter' page by selecting the option using 'Newsletter' Footer option after login", async () => {
    await home.goToHomePage();
    await helper.methodLogin();
    await newsletter.clickNewsletterFooter();
    await newsletter.expectNewsletterSubscription();
  });
  test("TC06-Validate 'Back' button in the 'Newsletter Subscription' page", async () => {
    await home.goToHomePage();
    await helper.methodLogin();
    await myAccount.clickNewsletterOption();
    await newsletter.expectNewsletterSubscription();
    await page.goBack();
    await myAccount.expectMyAccount();
  });
  test("TC07-Validate udpating the 'Subscribe' option in the 'Newsletter Subscription' page", async () => {
    await home.goToHomePage();
    await helper.methodLogin();
    await myAccount.clickNewsletterOption();
    await newsletter.expectNewsletterSubscription();
    await newsletter.alwaysExpectNewsletterOn();
    await newsletter.clickContinue();
    await newsletter.expectSuccessMessage();
    await myAccount.clickNewsletterRightColumn();
    await newsletter.expectNewsletterOn();
    await page.pause();
  });
  test("TC08-Validate the Breadcrumb of 'Newsletter Subscription' page", async () => {
    await home.goToHomePage();
    await helper.methodLogin();
    await myAccount.clickNewsletterOption();
    await newsletter.expectBreadcrumb();
  });
});
