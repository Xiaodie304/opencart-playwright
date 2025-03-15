import { expect } from "@playwright/test";
class LogoutPage {
  constructor(page) {
    this.page = page;
    this.logoutPageHeading = this.page.getByRole("heading", {
      name: "Account Logout",
    });
    this.continueLogout = this.page.getByRole("link", { name: "Continue" });
  }
  async expectLogout() {
    await expect(this.page).toHaveURL(/en-gb\?route=account\/logout/);
    await expect(this.logoutPageHeading).toBeVisible();
  }
  async clickContinueLogout() {
    await this.continueLogout.click();
  }
}
export default LogoutPage;
