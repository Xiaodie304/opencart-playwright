import { test } from "@playwright/test";
import HomePage from "../pages/homePage.js";
import SearchPage from "../pages/searchPage.js";
import ShoppingCartPage from "../pages/shoppingCartPage.js";
import Helper from "../utils/helper.js";
import CheckoutPage from "../pages/checkoutPage.js";
import SuccessPage from "../pages/successPage.js";
import AddressForm from "../pages/forms/addressForm.js";

test.describe("Checkout", () => {
  let context, page, addressForm;
  let home, search, shoppingCart, helper, checkout, success;

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    home = new HomePage(page);
    search = new SearchPage(page);
    shoppingCart = new ShoppingCartPage(page);
    helper = new Helper(page);
    checkout = new CheckoutPage(page);
    success = new SuccessPage(page);
    addressForm = new AddressForm(page);
  });
  test.afterEach(async () => {
    await page.close();
    await context.close();
  });
  test("TC01-Validate navigating to Checkout page when there are no products added to the Shopping Cart", async () => {
    await home.goToHomePage();
    await home.clickCheckout();
    await shoppingCart.expectEmptyCart();
  });
  test("TC02-Validate navigating to Checkout page from 'Shopping Cart' page", async () => {
    await home.goToHomePage();
    await home.fillSearchBoxAndClickSearch("iMac");
    await search.expectProductDisplayed();
    await search.clickAddToCartButton();
    await search.expectSuccessMessage();
    await search.shoppingCartLinkInSuccessMessage();
    await shoppingCart.clickCheckout();
    await checkout.expectCheckoutPage();
  });
  test("TC03-Validate navigating to Checkout page using 'Shopping Cart' header option", async () => {
    await home.goToHomePage();
    await home.fillSearchBoxAndClickSearch("iMac");
    await search.expectProductDisplayed();
    await search.clickAddToCartButton();
    await search.expectSuccessMessage();
    await home.clickCheckout();
    await checkout.expectCheckoutPage();
  });
  test("TC04-Validate navigating to Checkout page using 'Checkout' option in the Cart block", async () => {
    await home.goToHomePage();
    await home.fillSearchBoxAndClickSearch("iMac");
    await search.expectProductDisplayed();
    await search.clickAddToCartButton();
    await search.expectSuccessMessage();
    await checkout.clickBlackCheckoutButton();
    await checkout.clickCheckoutInBlackIcon();
    await checkout.expectCheckoutPage();
    await checkout.clickShippingMethod();
    await checkout.clickPaymentMethod();
    await checkout.addCommentToOrder("This is a test order");
  });
  test("TC05-Validate Checkout as SignedIn User ( SignIn Checkout ) by using an existing address during checkout", async () => {
    await home.goToHomePage();
    await helper.methodLogin();
    await home.fillSearchBoxAndClickSearch("iMac");
    await search.expectProductDisplayed();
    await search.clickAddToCartButton();
    await search.expectSuccessMessage();
    await search.shoppingCartLinkInSuccessMessage();
    await shoppingCart.clickCheckout();
    await checkout.expectCheckoutPage();
    await checkout.clickExistingAddress();
    await checkout.clickShippingMethod();
    await checkout.clickPaymentMethod();
    await checkout.addCommentToOrder("This is a test order");
    await checkout.confirmOrder();
    await success.expectSuccessPage();
    await success.expectOrderSuccessMessage();
    await success.clickContinue();
    await home.expectHomeYourStore();
  });
  test("TC06-Validate without entering any fields in the Billing Section of the Checkout Page", async () => {
    await home.goToHomePage();
    await helper.methodLogin();
    await home.fillSearchBoxAndClickSearch("iMac");
    await search.expectProductDisplayed();
    await search.clickAddToCartButton();
    await search.expectSuccessMessage();
    await search.shoppingCartLinkInSuccessMessage();
    await shoppingCart.clickCheckout();
    await checkout.expectCheckoutPage();
    await checkout.clickNewAddress();
    await checkout.clickContinue();
    await checkout.expectValidationError();
  });
  test("TC07-Validate Checkout as SignedIn User ( SignIn Checkout ) by entering new address into the mandatory fields of the Delivery Details section during checkout", async () => {
    await home.goToHomePage();
    await helper.methodLogin();
    await home.fillSearchBoxAndClickSearch("iMac");
    await search.expectProductDisplayed();
    await search.clickAddToCartButton();
    await search.expectSuccessMessage();
    await search.shoppingCartLinkInSuccessMessage();
    await shoppingCart.clickCheckout();
    await checkout.expectCheckoutPage();
    await checkout.clickNewAddress();
    await addressForm.fillFullAddress();
    await checkout.clickContinue();
    await checkout.clickShippingMethod();
    await checkout.clickPaymentMethod();
    await checkout.addCommentToOrder("This is a test order");
    await checkout.confirmOrder();
    await success.expectSuccessPage();
    await success.expectOrderSuccessMessage();
    await success.clickContinue();
    await home.expectHomeYourStore();
  });
});
