import { expect } from "@playwright/test";
class HomePage {
  constructor(page) {
    this.page = page;
    this.myAccountLink = page.getByRole("link", { name: " My Account " });
    this.loginLink = page.locator("#top").getByRole("link", { name: "Login" });
    this.homeYourStore = page.getByRole("link", { name: "Your Store" });
    this.logout = this.page
      .locator("#top")
      .getByRole("link", { name: "Logout" });
    this.fillSearch = page.getByRole("textbox", { name: "Search" });
    this.searchButton = page.getByRole("button", { name: "" });
    this.productDisplayIMac = page.getByRole("heading", {
      name: "iMac",
      exact: true,
    });
    this.desktopsLink = page.getByRole("link", {
      name: "Desktops",
      exact: true,
    });

    this.menuDesktopsPc = page.getByRole("link", { name: "PC (0)" });
    this.zeroProducts = page.getByText("There are no products to list");
    this.pcContinueGoToHomePage = page.getByRole("link", { name: "Continue" });
    this.headingFeatured = page.getByRole("heading", { name: "Featured" });
    this.featuredProducts1 = page.getByText("MacBook");
    this.featuredProducts2 = page.getByText("iPhone", { exact: true });
    this.featuredProducts3 = page.getByText("Apple Cinema 30");
    this.featuredProducts4 = page.getByText("Canon EOS 5D");
    this.wishList = page.getByRole("link", { name: /Wish List \(\d+\)/ });
    this.shoppingCartIcon = page.getByRole("button", {
      name: " 1 item(s) - $",
    });
    this.viewCart = page.getByRole("link", { name: " View Cart" });
    this.showAllDesktops = page.getByRole("link", {
      name: "Show All Desktops",
    });
    this.shoppingCartPage = page.getByRole("link", { name: " Shopping Cart" });
    this.addIphoneToCart = page
      .locator('button[formaction*="checkout/cart.add"]')
      .nth(1);
    this.checkoutButton = page.getByRole("link", { name: " Checkout" });
    this.myAccountButton = page
      .locator("#top")
      .getByRole("link", { name: "My Account", exact: true });
    this.myAccountFooter = page.getByRole("link", {
      name: "My Account",
      exact: true,
    });
    this.registerButton = page.getByRole("link", { name: "Register" });
    this.newsletterButton = page.getByRole("link", { name: "Newsletter" });
  }

  async goToHomePage() {
    await this.page.goto("/en-gb?route=common/home");
    await expect(this.homeYourStore).toBeVisible();
  }

  async openMyAccount() {
    await this.myAccountLink.click();
  }
  async clickMyAccount() {
    await this.myAccountButton.click();
  }

  async clickLogin() {
    await this.loginLink.click();
  }
  async clickLogout() {
    await expect(this.logout).toBeVisible();
    await this.logout.click();
  }
  async expectLogoutHidden() {
    await expect(this.logout).not.toBeVisible();
  }
  async expectLoginHidden() {
    await expect(this.loginLink).not.toBeVisible();
  }
  async fillSearchBoxAndClickSearch(fillSearch = null) {
    if (fillSearch) {
      await this.fillSearch.fill(fillSearch);
    }
    await expect(this.searchButton).toBeVisible();
    await this.searchButton.click();
  }
  async clickLogoOpencart() {
    await this.homeYourStore.click();
  }
  async expectHomeYourStore() {
    await expect(this.homeYourStore).toBeVisible();
  }
  async clickMenuDesktopsPc() {
    await this.desktopsLink.hover();
    await this.menuDesktopsPc.click();
    await expect(this.zeroProducts).toBeVisible();
    await this.pcContinueGoToHomePage.click();
  }
  async methodExpectFeaturedProducts() {
    await expect(this.headingFeatured).toBeVisible();
    await expect(this.featuredProducts1).toBeVisible();
    await expect(this.featuredProducts2).toBeVisible();
    await expect(this.featuredProducts3).toBeVisible();
    await expect(this.featuredProducts4).toBeVisible();
  }
  async clickWishList() {
    await this.wishList.click();
  }
  async clickShoppingCartIconBlack() {
    await this.shoppingCartIcon.click();
    await this.viewCart.click();
  }
  async clickMenuDesktopsAndShowAll() {
    await this.desktopsLink.hover();
    await this.showAllDesktops.click();
  }
  async gotoShoppingCartPage() {
    await this.shoppingCartPage.click();
  }
  async addIphoneToCartInFeatured() {
    await this.addIphoneToCart.click();
  }
  async clickCheckout() {
    await this.checkoutButton.click();
  }
  async expectMyAccountFooterAndClick() {
    await expect(this.myAccountFooter).toBeVisible();
    await this.myAccountFooter.click();
  }
  async clickRegister() {
    await this.registerButton.click();
  }
  async clickNewsletter() {
    await this.newsletterButton.click();
  }
}

export default HomePage;
