import { test, expect } from "@playwright/test";
import HomePage from "../pages/homePage.js";
import MyAccountPage from "../pages/myAccountPage.js";
import RegisterPage from "../pages/registerPage.js";
import RegisterAccountForm from "../pages/forms/registerAccountForm.js";
import verifyEmailContainsText from "../api/mailSlurp.js";
import NewsletterPage from "../pages/newsletterPage.js";
import createConnection from "../database/mysqlConnection.js";

test.describe("Register", () => {
  let context;
  let page;
  let home, myAccount, register, registerForm, newsletter;

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    home = new HomePage(page);
    myAccount = new MyAccountPage(page);
    register = new RegisterPage(page);
    registerForm = new RegisterAccountForm(page);
    newsletter = new NewsletterPage(page);
  });

  test.afterEach(async () => {
    await page.close();
    await context.close();
  });
  test("TC01-Validate Registering an Account by providing only the Mandatory fields", async () => {
    await home.goToHomePage();
    await home.openMyAccount();
    await home.clickRegister();
    await register.expectRegisterPage();
    await registerForm.fillFullRegisterAccountAndSave();
    await register.privacyPolicyCheck();
    await register.clickContinueRegister();
    await register.expectNotiCreatedAccount();
    await register.clickContinueAndGoToMyAccount();
    await myAccount.expectMyAccount();
  });
  test("TC02-Validate 'Thank you for registering' email is sent to the registered email address as a confrimation for registering the account.", async () => {
    const expectedText = "Thank you for registering!";
    await home.goToHomePage();
    await home.openMyAccount();
    await home.clickRegister();
    await register.expectRegisterPage();
    await registerForm.fillFullRegisterAccountAndSave();
    await register.privacyPolicyCheck();
    await register.clickContinueRegister();
    await register.expectNotiCreatedAccount();
    await verifyEmailContainsText(expectedText); // Mock API check email
    await register.clickContinueAndGoToMyAccount();
    await myAccount.expectMyAccount();
  });
  test("TC03-Validate Registering an account when 'Yes' option is selected for Newsletter field", async () => {
    await home.goToHomePage();
    await home.openMyAccount();
    await home.clickRegister();
    await register.expectRegisterPage();
    await registerForm.fillFullRegisterAccountAndSave();
    await register.privacyPolicyCheck();
    await register.clickNewsletterYes();
    await register.clickContinueRegister();
    await register.expectNotiCreatedAccount();
    await register.clickContinueAndGoToMyAccount();
    await myAccount.expectMyAccount();
  });
  test("TC04-Validate Registering an account when 'No' option is selected for Newsletter field", async () => {
    await home.goToHomePage();
    await home.openMyAccount();
    await home.clickRegister();
    await register.expectRegisterPage();
    await registerForm.fillFullRegisterAccountAndSave();
    await register.privacyPolicyCheck();
    await register.clickContinueRegister();
    await register.expectNotiCreatedAccount();
    await register.clickContinueAndGoToMyAccount();
    await myAccount.expectMyAccount();
    await myAccount.clickNewsletterOption();
    await newsletter.expectNewsletterOff();
  });
  test("TC05-Validate Registering an account by providing the existing account details (i.e. existing email address)", async () => {
    await home.goToHomePage();
    await home.openMyAccount();
    await home.clickRegister();
    await register.expectRegisterPage();
    await register.fillExistingEmail();
    await register.privacyPolicyCheck();
    await register.clickContinueRegister();
    await register.expectWarringSusscess();
  });
  test("TC6-Validate Registering an account by providing an invalid email address into the E-mail field", async () => {
    await home.goToHomePage();
    await home.openMyAccount();
    await home.clickRegister();
    await register.expectRegisterPage();
    await registerForm.fillFullRegisterAccountAndSave();
    await register.clearEmailAndFillNewEmail("example.com");
    await register.privacyPolicyCheck();
    await register.clickContinueRegister();
    await register.expectInvalidEmail();
  });
  test("TC07-Validate gthe details that are provided while Registering an account that are stored in the database", async () => {
    await home.goToHomePage();
    await home.openMyAccount();
    await home.clickRegister();
    await registerForm.fillFullRegisterAccountAndSave();
    const email = await register.exportMail();
    await register.privacyPolicyCheck();
    await register.clickContinueRegister();
    await register.clickContinueAndGoToMyAccount();
    const connection = await createConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM oc_customer WHERE email = ?",
      [email]
    );
    if (rows.length) {
      console.log("Registered first name:", rows[0].firstname);
    }
    expect(rows[0].email).toBe(email);
    await connection.end();
  });
  test("TC08-Validate Registering account without checking 'Privacy Policy' checkbox option", async () => {
    await home.goToHomePage();
    await home.openMyAccount();
    await home.clickRegister();
    await register.expectRegisterPage();
    await registerForm.fillFullRegisterAccountAndSave();
    await register.clickContinueRegister();
    await register.expectWarringSusscess();
  });
});
