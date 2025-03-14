import { expect } from "@playwright/test";
class LoginPage {
  constructor(page) {
    this.page = page;
    this.affiliateHeading = page.getByRole("link", {
      name: "Edit your account information",
    });
  }
  async expectLogin() {
    await expect(this.affiliateHeading).toBeVisible();
  }
}

export default LoginPage;
