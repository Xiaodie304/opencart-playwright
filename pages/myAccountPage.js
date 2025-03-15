import { expect } from "@playwright/test";
class MyAccountPage {
  constructor(page) {
    this.page = page;
    this.affiliateHeading = page.getByRole("link", {
      name: "Edit your account information",
    });
    this.logoutRightColumn = page.getByRole("link", { name: "Logout" });
  }
  async expectLogin() {
    await expect(this.affiliateHeading).toBeVisible();
  }
  async clickLogout() {
    await this.logoutRightColumn.click();
  }
}

export default MyAccountPage;
